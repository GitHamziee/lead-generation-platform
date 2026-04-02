import { NextResponse } from "next/server";
import { sendContactFormEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const rl = rateLimit(`contact:${ip}`, 3, 60 * 1000);
    if (!rl.success) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${rl.retryAfter}s.` },
        { status: 429 }
      );
    }

    const { name, email, phone, company, message, marketingConsent, messagingTerms } =
      await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await sendContactFormEmail({ name, email, phone, company, message, marketingConsent, messagingTerms });

    return NextResponse.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
