import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { requireAdmin, applyRateLimit } from "@/lib/api-utils";
import { validatePassword } from "@/lib/validation";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const [, authError] = await requireAdmin();
    if (authError) return authError;

    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        licenseNo: true,
        brokerage: true,
        targetAreas: true,
        state: true,
        accountExecutive: true,
        role: true,
        leadCost: true,
        createdAt: true,
        updatedAt: true,
        purchases: {
          select: {
            id: true,
            status: true,
            expiresAt: true,
            createdAt: true,
            package: {
              select: { name: true, price: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        customPackage: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            features: true,
            durationDays: true,
            type: true,
            isActive: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Admin user detail error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const [session, authError] = await requireAdmin();
    if (authError) return authError;

    const rateLimited = applyRateLimit(`admin:${session.user.id}`, 60, 60 * 1000);
    if (rateLimited) return rateLimited;

    const { id } = await params;
    const body = await req.json();
    const { role, newPassword, cancelPurchaseId } = body;

    // --- Cancel subscription ---
    if (cancelPurchaseId) {
      const purchase = await prisma.purchase.findFirst({
        where: {
          id: cancelPurchaseId,
          userId: id,
          status: "ACTIVE",
          OR: [{ expiresAt: { gt: new Date() } }, { expiresAt: null }],
        },
      });

      if (!purchase) {
        return NextResponse.json(
          { error: "Active subscription not found" },
          { status: 404 }
        );
      }

      await prisma.purchase.update({
        where: { id: cancelPurchaseId },
        data: { status: "CANCELLED" },
      });

      return NextResponse.json({ message: "Subscription cancelled successfully" });
    }

    // --- Password change ---
    if (newPassword) {
      const passwordResult = validatePassword(newPassword);
      if (!passwordResult.valid) {
        return NextResponse.json(
          { error: passwordResult.error },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await prisma.user.update({
        where: { id },
        data: {
          password: hashedPassword,
          tokenVersion: { increment: 1 },
        },
      });

      return NextResponse.json({ message: "Password updated successfully" });
    }

    // --- Lead cost update ---
    if ("leadCost" in body) {
      const cents = parseInt(body.leadCost);
      if (isNaN(cents) || cents < 0) {
        return NextResponse.json({ error: "Invalid lead cost" }, { status: 400 });
      }
      await prisma.user.update({
        where: { id },
        data: { leadCost: cents },
      });
      return NextResponse.json({ message: "Lead cost updated successfully" });
    }

    // --- Custom package ---
    if (body.action === "customPackage") {
      if (body.subAction === "delete") {
        // Delete custom package (and associated purchases)
        const existing = await prisma.package.findFirst({
          where: { assignedUserId: id, isCustom: true },
        });
        if (!existing) {
          return NextResponse.json({ error: "No custom package found" }, { status: 404 });
        }
        await prisma.purchase.deleteMany({ where: { packageId: existing.id } });
        await prisma.package.delete({ where: { id: existing.id } });
        return NextResponse.json({ message: "Custom package deleted" });
      }

      // Save (create or update)
      const { name, price, description, features, type, durationDays } = body;
      if (!name || price === undefined || price === null) {
        return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
      }
      const cents = Math.round(Number(price));
      if (isNaN(cents) || cents < 0) {
        return NextResponse.json({ error: "Invalid price" }, { status: 400 });
      }

      const packageData = {
        name: String(name),
        price: cents,
        description: description || null,
        features: Array.isArray(features) ? features : [],
        type: type === "PAY_PER_LEAD" ? "PAY_PER_LEAD" as const : "SUBSCRIPTION" as const,
        durationDays: durationDays ? parseInt(durationDays) : null,
        isActive: true,
        isCustom: true,
        assignedUserId: id,
      };

      const existing = await prisma.package.findFirst({
        where: { assignedUserId: id, isCustom: true },
      });

      if (existing) {
        await prisma.package.update({
          where: { id: existing.id },
          data: packageData,
        });
      } else {
        await prisma.package.create({ data: packageData });
      }

      return NextResponse.json({ message: "Custom package saved" });
    }

    // --- Role change ---
    const validRoles = ["USER", "AGENT", "ADMIN"];
    if (role && !validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Prevent admin from removing their own admin role
    if (id === session.user.id && role !== "ADMIN") {
      return NextResponse.json(
        { error: "Cannot remove your own admin role" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(role && { role }),
        tokenVersion: { increment: 1 },
      },
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json({ user, message: "User updated successfully" });
  } catch (error) {
    console.error("Admin user update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
