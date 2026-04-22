import { notFound } from "next/navigation";
import { getSiteSettings } from "@/lib/site-settings";
import ForgotPasswordClient from "./ForgotPasswordClient";

export default async function ForgotPasswordPage() {
  const { hidePages } = await getSiteSettings();
  if (hidePages) notFound();

  return <ForgotPasswordClient />;
}
