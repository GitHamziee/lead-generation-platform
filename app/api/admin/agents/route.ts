import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { requireAdmin, applyRateLimit } from "@/lib/api-utils";
import { validateEmail, validatePassword, validateName, sanitizeInput } from "@/lib/validation";

export async function GET() {
  const [, authError] = await requireAdmin();
  if (authError) return authError;

  const agents = await prisma.user.findMany({
    where: { role: "AGENT" },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      _count: { select: { agentLeads: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ agents });
}

export async function POST(req: Request) {
  const [session, authError] = await requireAdmin();
  if (authError) return authError;

  try {
    const rateLimited = applyRateLimit(`create-agent:${session.user.id}`, 10, 60 * 1000);
    if (rateLimited) return rateLimited;

    const body = await req.json();
    const { name, email, password } = body;

    const nameResult = validateName(name);
    if (!nameResult.valid) {
      return NextResponse.json({ error: nameResult.error }, { status: 400 });
    }

    const emailResult = validateEmail(email);
    if (!emailResult.valid) {
      return NextResponse.json({ error: emailResult.error }, { status: 400 });
    }

    const passwordResult = validatePassword(password);
    if (!passwordResult.valid) {
      return NextResponse.json({ error: passwordResult.error }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name: sanitizeInput(name),
        email: normalizedEmail,
        password: hashed,
        phone: "",
        role: "AGENT",
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error("Create agent error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
