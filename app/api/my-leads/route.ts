import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireUser, applyRateLimit } from "@/lib/api-utils";
import { acceptLead, declineLead } from "@/lib/lead-utils";
import { createInvoice, markLeadPaidByPackage } from "@/lib/invoice-utils";

export async function GET(req: NextRequest) {
  try {
    const [session, authError] = await requireUser();
    if (authError) return authError;

    const rateLimited = applyRateLimit(`my-leads:${session.user.id}`, 60, 60 * 1000);
    if (rateLimited) return rateLimited;

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1") || 1);
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10") || 10));
    const status = searchParams.get("status") || "";
    const skipStats = searchParams.get("skipStats") === "1";

    const where: Record<string, unknown> = {
      assignedToId: session.user.id,
    };

    if (["PENDING", "ACCEPTED", "INVOICED", "PAID"].includes(status)) {
      where.status = status;
    } else {
      where.status = { in: ["PENDING", "ACCEPTED", "INVOICED", "PAID"] };
    }

    // Explicit select — only fetch fields the UI needs, prevents leaking new schema fields
    const leadSelect = {
      id: true,
      leadType: true,
      name: true,
      phone: true,
      email: true,
      address: true,
      propertyType: true,
      bedsBaths: true,
      timeline: true,
      contractStatus: true,
      appointmentTime: true,
      notes: true,
      status: true,
      createdAt: true,
      agent: { select: { id: true, name: true, email: true } },
      invoice: { select: { id: true, amount: true, status: true, description: true } },
    };

    // Skip stats on silent polls — saves a groupBy query every 30s
    const queries: [unknown, unknown, unknown?] = [
      prisma.lead.findMany({
        where,
        select: leadSelect,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lead.count({ where }),
      !skipStats
        ? prisma.lead.groupBy({
            by: ["status"],
            where: { assignedToId: session.user.id },
            _count: { _all: true },
          })
        : undefined,
    ];

    const [leads, total, statusCounts] = await Promise.all(queries) as [
      unknown[],
      number,
      { status: string; _count: { _all: number } }[] | undefined,
    ];

    let stats;
    if (statusCounts) {
      const countByStatus: Record<string, number> = {};
      for (const row of statusCounts) {
        countByStatus[row.status] = row._count._all;
      }
      stats = {
        pendingCount: countByStatus["PENDING"] || 0,
        acceptedCount: countByStatus["ACCEPTED"] || 0,
        invoicedCount: countByStatus["INVOICED"] || 0,
        paidCount: countByStatus["PAID"] || 0,
      };
    }

    return NextResponse.json({
      leads,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      ...(stats && { stats }),
    });
  } catch (error) {
    console.error("My leads error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const [session, authError] = await requireUser();
    if (authError) return authError;

    const rateLimited = applyRateLimit(
      `my-leads:${session.user.id}`,
      30,
      60 * 1000
    );
    if (rateLimited) return rateLimited;

    const { leadId, action } = await req.json();

    if (!leadId || !action) {
      return NextResponse.json(
        { error: "leadId and action are required" },
        { status: 400 }
      );
    }

    if (action === "accept") {
      const result = await acceptLead(leadId, session.user.id);
      if ("error" in result) {
        return NextResponse.json(
          { error: result.error },
          { status: result.status }
        );
      }

      // Determine billing mode from active package type
      const userData = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          leadCost: true,
          purchases: {
            where: {
              status: "ACTIVE",
              OR: [{ expiresAt: { gt: new Date() } }, { expiresAt: null }],
            },
            take: 1,
            select: { package: { select: { name: true, type: true } } },
          },
        },
      });

      const activePkg = userData?.purchases?.[0]?.package;
      if (activePkg?.type === "PAY_PER_LEAD") {
        // Only auto-invoice if admin has set a per-lead cost for this user
        if (userData?.leadCost && userData.leadCost > 0) {
          const invoiceResult = await createInvoice(leadId, userData.leadCost);
          if ("error" in invoiceResult) {
            console.error("Auto-invoice failed:", invoiceResult.error);
          }
        }
      } else if (activePkg?.type === "SUBSCRIPTION") {
        const payResult = await markLeadPaidByPackage(leadId, activePkg.name);
        if ("error" in payResult) {
          console.error("Auto-pay by package failed:", payResult.error);
        }
      }

      return NextResponse.json({ lead: result.lead, message: "Lead accepted" });
    }

    if (action === "decline") {
      const result = await declineLead(leadId, session.user.id);
      if ("error" in result) {
        return NextResponse.json(
          { error: result.error },
          { status: result.status }
        );
      }
      return NextResponse.json({ lead: result.lead, message: "Lead declined" });
    }

    return NextResponse.json(
      { error: "Invalid action. Use 'accept' or 'decline'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("My leads action error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
