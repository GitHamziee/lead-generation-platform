import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "R4Referral's Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, share, and protect your information."
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">

              <p className="text-sm text-slate-500 dark:text-slate-400">Effective Date: April 8th, 2026</p>

              <div>
                <p>
                  This Privacy Policy explains how R4Referral LLC (&quot;R4Referral,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
                  collects, uses, shares, and protects information in connection with your use of our websites, services,
                  tools, and applications (collectively, the &quot;Services&quot;). This includes compliance with A2P SMS
                  messaging regulations, TCPA, and CTIA standards.
                </p>
                <p className="mt-3">
                  By using our Services, you consent to the practices described in this Privacy Policy.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. Business Information</h2>
                <ul className="space-y-1">
                  <li><strong className="text-slate-800 dark:text-slate-200">Business Name:</strong> R4Referral LLC</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Legal Business Name:</strong> R4Referral LLC</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">EIN:</strong> 414535461</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Business Type:</strong> Limited Liability Company</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Industry:</strong> Real Estate</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Business Website:</strong>{" "}
                    <a href="https://r4referral.com" className="text-brand-600 hover:underline">https://r4referral.com</a>
                  </li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Business Address:</strong> 5900 Balcones Drive STE 100, Austin, TX 78731, USA</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Phone:</strong>{" "}
                    <a href="tel:+15126780096" className="text-brand-600 hover:underline">+1 512-678-0096</a>
                  </li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Email:</strong>{" "}
                    <a href="mailto:r4referral@gmail.com" className="text-brand-600 hover:underline">r4referral@gmail.com</a>
                  </li>
                  <li><strong className="text-slate-800 dark:text-slate-200">CEO / Authorized Representative:</strong> Muhammad Hamza Lon</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. Information We Collect</h2>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">2.1 Personal Information</h3>
                <p>We collect information you provide voluntarily, including:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Full name, email, phone number</li>
                  <li>Physical or business address</li>
                  <li>Payment information (if applicable)</li>
                  <li>Referral details, inquiry information, or service preferences</li>
                  <li>SMS/email consent records with timestamps</li>
                </ul>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">2.2 Non-Personal Information</h3>
                <p>We automatically collect:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>IP address, browser type, and device information</li>
                  <li>Website usage data and analytics</li>
                  <li>Cookies, pixels, and similar technologies for tracking</li>
                </ul>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">2.3 Third-Party Information</h3>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Marketing partners, analytics platforms, or CRM integrations</li>
                  <li>Verification or demographic services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Provide, improve, and personalize our Services</li>
                  <li>Process inquiries, requests, and transactions</li>
                  <li>Send updates, offers, notifications, and referrals</li>
                  <li>Conduct analytics and performance tracking</li>
                  <li>Maintain compliance with legal and regulatory obligations</li>
                  <li>Prevent fraud and ensure system security</li>
                </ul>
                <p className="mt-3">
                  We may contact you via phone, SMS, email, WhatsApp, LinkedIn, or Facebook. Promotional messages
                  are only sent to users who have opted in.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">4. SMS Messaging &amp; A2P Compliance</h2>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.1 Consent &amp; Opt-In</h3>
                <p>
                  By providing your phone number, you explicitly consent to receive SMS messages from R4Referral LLC.
                  Consent is collected via website forms, checkboxes, or other communication channels.
                  All opt-ins are recorded with timestamp and source for compliance purposes.
                </p>
                <p className="mt-3">Messages may include:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Appointment confirmations and reminders</li>
                  <li>Referral updates</li>
                  <li>Service notifications</li>
                  <li>Promotional messages (only if consented)</li>
                </ul>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.2 Opt-Out Instructions</h3>
                <p>
                  Reply <strong className="text-slate-800 dark:text-slate-200">STOP</strong> to any message to unsubscribe.
                  You will receive a confirmation that you have been unsubscribed.
                  No further messages will be sent unless you opt in again.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.3 Help &amp; Support</h3>
                <p>
                  Reply <strong className="text-slate-800 dark:text-slate-200">HELP</strong> for assistance.<br />
                  Email:{" "}
                  <a href="mailto:r4referral@gmail.com" className="text-brand-600 hover:underline">r4referral@gmail.com</a><br />
                  Phone:{" "}
                  <a href="tel:+15126780096" className="text-brand-600 hover:underline">+1 512-678-0096</a>
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.4 Message Frequency</h3>
                <p>
                  Message frequency varies based on your interactions.
                  Standard message and data rates may apply.
                  Messages comply with TCPA, CTIA, and A2P SMS standards.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.5 Carrier Disclaimer</h3>
                <p>
                  Carriers are not responsible for delayed or undelivered messages.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">5. Information Sharing &amp; Disclosure</h2>
                <p>We do not sell or trade personal information. We share information only in these cases:</p>
                <ul className="mt-2 space-y-2 list-disc list-inside">
                  <li><strong className="text-slate-800 dark:text-slate-200">With consent:</strong> You authorize sharing with partners or affiliates.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Service providers:</strong> CRM, SMS delivery platforms, marketing analytics, or legal support.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Business partners:</strong> Joint promotions or services.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Legal compliance:</strong> To comply with laws, protect rights, or prevent fraud.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Business transfers:</strong> If R4Referral merges, acquires, or sells assets.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">6. Data Security</h2>
                <p>We implement:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Encryption of sensitive data</li>
                  <li>Secure access controls and staff training</li>
                  <li>System monitoring and backup procedures</li>
                </ul>
                <p className="mt-3">
                  <strong className="text-slate-800 dark:text-slate-200">Note:</strong> No system is 100% secure.
                  Users must protect their account credentials.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">7. Cookies &amp; Tracking</h2>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Used to improve website performance, analyze behavior, and remember preferences</li>
                  <li>Users can disable cookies in browser settings</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">8. User Rights &amp; Choices</h2>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Access, update, or delete personal information</li>
                  <li>Opt out of SMS or email communications</li>
                  <li>Withdraw consent anytime</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">9. Children&apos;s Privacy</h2>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Services are not for children under 13</li>
                  <li>Any data from minors will be deleted promptly</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">10. Third-Party Links</h2>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Not responsible for third-party content or privacy practices</li>
                  <li>Review their policies before sharing information</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">11. Changes to This Policy</h2>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Updates posted with new Effective Date</li>
                  <li>Continued use constitutes acceptance</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">12. Contact Information</h2>
                <p>
                  R4Referral LLC<br />
                  5900 Balcones Drive STE 100, Austin, TX 78731, USA<br />
                  Phone:{" "}
                  <a href="tel:+15126780096" className="text-brand-600 hover:underline">+1 512-678-0096</a><br />
                  Email:{" "}
                  <a href="mailto:r4referral@gmail.com" className="text-brand-600 hover:underline">r4referral@gmail.com</a><br />
                  Website:{" "}
                  <a href="https://r4referral.com" className="text-brand-600 hover:underline">https://r4referral.com</a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
