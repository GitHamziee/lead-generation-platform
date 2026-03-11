import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin, applyRateLimit } from "@/lib/api-utils";

export async function GET(req: NextRequest) {
  try {
    const [session, authError] = await requireAdmin();
    if (authError) return authError;

    const rateLimited = applyRateLimit(`admin-analytics:${session.user.id}`, 30, 60 * 1000);
    if (rateLimited) return rateLimited;

    const { searchParams } = new URL(req.url);
    const monthParam = searchParams.get("month"); // YYYY-MM

    const now = new Date();
    let year = now.getUTCFullYear();
    let month = now.getUTCMonth(); // 0-indexed

    if (monthParam && /^\d{4}-\d{2}$/.test(monthParam)) {
      const [y, m] = monthParam.split("-").map(Number);
      if (y >= 2020 && y <= 2100 && m >= 1 && m <= 12) {
        year = y;
        month = m - 1;
      }
    }

    const monthStart = new Date(Date.UTC(year, month, 1));
    const monthEnd = new Date(Date.UTC(year, month + 1, 1));
    const trendStart = new Date(Date.UTC(year, month - 11, 1));

    const [
      allPackages,
      allTimeCounts,
      monthCounts,
      trendData,
      totalLeadAgg,
      monthLeadAgg,
      leadTrendData,
    ] = await Promise.all([
      // All packages (for price map + breakdown display)
      prisma.package.findMany({
        select: { id: true, name: true, price: true, isCustom: true, sortOrder: true },
      }),
      // All-time: count per package (instead of fetching every purchase)
      prisma.purchase.groupBy({
        by: ["packageId"],
        _count: { _all: true },
      }),
      // Selected month: count per package
      prisma.purchase.groupBy({
        by: ["packageId"],
        where: { createdAt: { gte: monthStart, lt: monthEnd } },
        _count: { _all: true },
      }),
      // 12-month trend (bounded, no join needed — use priceMap)
      prisma.purchase.findMany({
        where: { createdAt: { gte: trendStart, lt: monthEnd } },
        select: { createdAt: true, packageId: true },
      }),
      // All-time lead invoice revenue (aggregate instead of fetching all)
      prisma.invoice.aggregate({
        where: { status: "PAID" },
        _sum: { amount: true },
      }),
      // Selected month lead invoices (aggregate + count)
      prisma.invoice.aggregate({
        where: { status: "PAID", paidAt: { gte: monthStart, lt: monthEnd } },
        _sum: { amount: true },
        _count: { _all: true },
      }),
      // 12-month lead invoice trend (bounded)
      prisma.invoice.findMany({
        where: { status: "PAID", paidAt: { gte: trendStart, lt: monthEnd } },
        select: { amount: true, paidAt: true },
      }),
    ]);

    // Price + name maps for lookups
    const priceMap = new Map(allPackages.map((p) => [p.id, p.price]));
    const nameMap = new Map(allPackages.map((p) => [p.id, p.name]));

    // All-time revenue: sum(count * price) per package — O(packages) not O(purchases)
    const totalRevenue = allTimeCounts.reduce(
      (sum, g) => sum + (priceMap.get(g.packageId) ?? 0) * g._count._all,
      0
    );

    // Lead invoice revenue (from aggregates — single number, no iteration)
    const totalLeadRevenue = totalLeadAgg._sum.amount ?? 0;
    const monthLeadRevenue = monthLeadAgg._sum.amount ?? 0;
    const monthLeadCount = monthLeadAgg._count._all;

    // Month revenue + per-package breakdown
    const packageBreakdown = new Map<string, { count: number; revenue: number }>();
    let monthRevenue = 0;
    let monthSales = 0;

    for (const g of monthCounts) {
      const price = priceMap.get(g.packageId) ?? 0;
      const count = g._count._all;
      monthRevenue += price * count;
      monthSales += count;
      const name = nameMap.get(g.packageId) ?? "Unknown";
      packageBreakdown.set(name, { count, revenue: price * count });
    }

    // Include all non-custom packages (even with 0 sales that month)
    const packages = allPackages
      .filter((p) => !p.isCustom)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((pkg) => ({
        name: pkg.name,
        price: pkg.price,
        count: packageBreakdown.get(pkg.name)?.count ?? 0,
        revenue: packageBreakdown.get(pkg.name)?.revenue ?? 0,
      }));

    // Build 12-month trend
    const trendMap = new Map<string, { revenue: number; sales: number; leadRevenue: number; leadCount: number }>();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(Date.UTC(year, month - i, 1));
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
      trendMap.set(key, { revenue: 0, sales: 0, leadRevenue: 0, leadCount: 0 });
    }

    for (const p of trendData) {
      const d = new Date(p.createdAt);
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
      const entry = trendMap.get(key);
      if (entry) {
        entry.revenue += priceMap.get(p.packageId) ?? 0;
        entry.sales++;
      }
    }

    for (const inv of leadTrendData) {
      if (!inv.paidAt) continue;
      const d = new Date(inv.paidAt);
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
      const entry = trendMap.get(key);
      if (entry) {
        entry.leadRevenue += inv.amount;
        entry.leadCount++;
      }
    }

    const trend = Array.from(trendMap.entries()).map(([m, d]) => ({
      month: m,
      ...d,
    }));

    return NextResponse.json({
      totalRevenue,
      monthRevenue,
      monthSales,
      totalLeadRevenue,
      monthLeadRevenue,
      monthLeadCount,
      selectedMonth: `${year}-${String(month + 1).padStart(2, "0")}`,
      packages,
      trend,
    });
  } catch (error) {
    console.error("Admin analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
