import type { Metadata } from "next";
import Badge from "@/components/shared/Badge";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with R4Referral. Start receiving verified real estate leads tailored to your market.",
};

export default function ContactPage() {
  return (
    <>
      <div className="relative overflow-hidden bg-white pt-24 pb-12 text-center">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />
        <div className="absolute top-1/2 -right-24 h-48 w-48 rounded-full bg-accent-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4">
          <div className="flex justify-center mb-4">
            <Badge>Contact Us</Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Book Your Free{" "}
            <span className="gradient-text">Strategy Call</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            No commitment. No pressure. Just a straight conversation about
            whether we can help you scale.
          </p>
        </div>
      </div>
      <ContactForm />
    </>
  );
}
