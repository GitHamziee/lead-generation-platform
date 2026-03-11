import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    // Standard packages (exclude custom)
    const packages = await prisma.package.findMany({
      where: { isActive: true, isCustom: false },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        features: true,
        sortOrder: true,
      },
      orderBy: { sortOrder: "asc" },
    });

    // If userId provided, also fetch their custom package
    let customPackage = null;
    if (userId) {
      customPackage = await prisma.package.findFirst({
        where: { assignedUserId: userId, isCustom: true, isActive: true },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          features: true,
          durationDays: true,
          type: true,
        },
      });
    }

    return NextResponse.json({ packages, customPackage });
  } catch (error) {
    console.error("Packages list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
