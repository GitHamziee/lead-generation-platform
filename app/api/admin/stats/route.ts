import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin, applyRateLimit } from "@/lib/api-utils";
import { expireStaleSubscriptions } from "@/lib/purchase-utils";

export async function GET() {
  try {
    const [session, authError] = await requireAdmin();
    if (authError) return authError;

    const rateLimited = applyRateLimit(`admin:${session.user.id}`, 60, 60 * 1000);
    if (rateLimited) return rateLimited;

    // Opportunistic cleanup: expire stale subscriptions on admin load
    await expireStaleSubscriptions();

    // Current month boundaries
    const now = new Date();
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

    // Run all queries in parallel
    const [
      totalUsers,
      newUsersThisMonth,
      totalAdmins,
      totalAgents,
      activeSubscriptions,
      newSubscriptionsThisMonth,
      allTimeRevenue,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: { createdAt: { gte: monthStart } },
      }),
      prisma.user.count({
        where: { role: "ADMIN" },
      }),
      prisma.user.count({
        where: { role: "AGENT" },
      }),
      prisma.purchase.count({
        where: {
          status: "ACTIVE",
          OR: [
            { expiresAt: { gt: new Date() } },
            { expiresAt: null },
          ],
        },
      }),
      prisma.purchase.count({
        where: { createdAt: { gte: monthStart } },
      }),
      prisma.purchase.findMany({
        select: { package: { select: { price: true } } },
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
    ]);

    const totalRevenue = allTimeRevenue.reduce(
      (sum: number, p: { package: { price: number } }) => sum + p.package.price,
      0
    );

    return NextResponse.json({
      totalUsers,
      newUsersThisMonth,
      totalAdmins,
      totalAgents,
      activeSubscriptions,
      newSubscriptionsThisMonth,
      revenueThisMonth: totalRevenue,
      recentUsers,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
