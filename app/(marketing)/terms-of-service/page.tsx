import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "R4Referral's Terms and Conditions — the rules governing your use of our platform and services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHeader
        badge="Legal"
        title="Terms &amp; Conditions"
        subtitle="Effective Date: April 8th, 2026"
      />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-10">
            <div className="space-y-8 text-slate-600 dark:text-slate-400 leading-relaxed">

              <div>
                <p>
                  These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of services, websites, and applications
                  provided by R4Referral LLC (&quot;R4Referral,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
                  By accessing or using R4Referral&apos;s services (collectively referred to as the &quot;Services&quot;),
                  you (&quot;you,&quot; &quot;your,&quot; or &quot;User&quot;) agree to these Terms. If you do not agree,
                  please discontinue use immediately.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">1. About R4Referral LLC</h2>
                <p>
                  R4Referral LLC is a digital referral network that connects businesses and professionals with high-quality
                  referrals and marketing solutions designed to streamline client acquisition. Our services combine human
                  expertise with data-driven systems to improve engagement, conversions, and business growth.
                </p>
                <p className="mt-3"><strong className="text-slate-800 dark:text-slate-200">Business Information:</strong></p>
                <ul className="mt-2 space-y-1">
                  <li><strong className="text-slate-800 dark:text-slate-200">Legal Name:</strong> R4Referral LLC</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">EIN:</strong> 414535461</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Address:</strong> 5900 Balcones Dr, Ste 100, Austin, TX 78731, USA</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Phone:</strong>{" "}
                    <a href="tel:+15126780096" className="text-brand-600 hover:underline">+1 512-678-0096</a>
                  </li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Email:</strong>{" "}
                    <a href="mailto:r4referral@gmail.com" className="text-brand-600 hover:underline">r4referral@gmail.com</a>
                  </li>
                  <li><strong className="text-slate-800 dark:text-slate-200">Website:</strong>{" "}
                    <a href="https://r4referral.com" className="text-brand-600 hover:underline">https://r4referral.com</a>
                  </li>
                  <li><strong className="text-slate-800 dark:text-slate-200">CEO / Authorized Representative:</strong> Muhammad Hamza Lon, hamzalone515@gmail.com</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">2. Acceptance of Terms</h2>
                <p>
                  By using our Services, you agree to comply with and be bound by these Terms. If using the Services on
                  behalf of a company or organization, you confirm you have authority to bind that entity.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">3. Modifications to Terms</h2>
                <p>
                  R4Referral reserves the right to modify or update these Terms at any time. Updates are effective
                  immediately upon posting. Continued use of Services after updates constitutes acceptance of the revised Terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">4. SMS &amp; A2P Messaging Terms</h2>
                <p>
                  R4Referral provides SMS and A2P communications to users who explicitly opt-in via website forms or
                  checkboxes. All messaging complies with TCPA and relevant U.S. regulations.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.1 Purpose</h3>
                <p>SMS messages may include:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Appointment or referral confirmations</li>
                  <li>Service reminders</li>
                  <li>Rescheduling notifications</li>
                  <li>Policy updates and notices</li>
                  <li>Customer support messages</li>
                </ul>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.2 Opt-In Requirement</h3>
                <p>
                  Users must explicitly opt-in via forms on our website.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.3 Opt-Out / Cancellation</h3>
                <p>
                  You can cancel SMS messaging anytime by replying{" "}
                  <strong className="text-slate-800 dark:text-slate-200">STOP</strong>. A confirmation will be sent.
                  No further messages will be delivered unless you opt-in again.
                </p>
                <p className="mt-3">
                  For help, reply <strong className="text-slate-800 dark:text-slate-200">HELP</strong> or contact:<br />
                  Phone:{" "}
                  <a href="tel:+15126780096" className="text-brand-600 hover:underline">+1 512-678-0096</a><br />
                  Email:{" "}
                  <a href="mailto:r4referral@gmail.com" className="text-brand-600 hover:underline">r4referral@gmail.com</a>
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.4 Message Frequency</h3>
                <p>
                  Frequency may vary based on interaction. Message and data rates may apply.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.5 Age Requirement</h3>
                <p>
                  Users must be at least 18 years old to opt-in and use SMS services.
                </p>

                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-2">4.6 Carrier Liability</h3>
                <p>
                  Carriers are not responsible for delays or undelivered messages. R4Referral is not liable for failures
                  caused by network conditions.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">5. User Responsibilities</h2>
                <p>You agree to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Provide accurate contact information</li>
                  <li>Use Services lawfully</li>
                  <li>Notify R4Referral of any changes to phone or email</li>
                </ul>
                <p className="mt-3">
                  You are responsible for damages or claims resulting from misuse or inaccurate info.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">6. Refund Policy</h2>
                <p>
                  Refund eligibility is governed by R4Referral&apos;s official{" "}
                  <Link href="/refund-policy" className="text-brand-600 hover:underline">Refund Policy</Link>.
                </p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Requests must be in writing within 60 days of Service Agreement.</li>
                  <li>A 15% processing fee applies.</li>
                  <li>Services in progress may retain up to 50% of total payment.</li>
                  <li>Voluntary cancellations or change of mind are not eligible.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">7. Confidential Information</h2>
                <p>Both parties must maintain confidentiality of all non-public information, including:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Business strategies</li>
                  <li>Data and analytics</li>
                  <li>Client lists</li>
                </ul>
                <p className="mt-3">Exclusions:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Publicly available info</li>
                  <li>Previously known info</li>
                  <li>Lawfully obtained info from third parties</li>
                </ul>
                <p className="mt-3">
                  R4Referral may share relevant info with authorized partners as required to deliver Services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">8. Data Usage &amp; Privacy</h2>
                <p>By using Services, you authorize R4Referral to collect, process, and use your data to:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Deliver and improve Services</li>
                  <li>Provide customer support</li>
                  <li>Detect and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
                <p className="mt-3">
                  Privacy Policy:{" "}
                  <Link href="/privacy-policy" className="text-brand-600 hover:underline">https://r4referral.com/privacy-policy</Link>
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">9. Warranty Disclaimer</h2>
                <p>
                  Services are provided &quot;as is.&quot; R4Referral makes no warranties, express or implied, including:
                </p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Merchantability or fitness for a particular purpose</li>
                  <li>Accuracy, reliability, or availability</li>
                  <li>Non-infringement of third-party rights</li>
                </ul>
                <p className="mt-3">Use of Services is at your own risk.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">10. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless R4Referral LLC, its officers, employees, and partners from
                  claims, damages, or losses arising from:
                </p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Your use or misuse of Services</li>
                  <li>Violation of these Terms</li>
                  <li>Violation of law or third-party rights</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">11. Limitation of Liability</h2>
                <p>
                  R4Referral LLC shall not be liable for indirect, incidental, special, or consequential damages,
                  including lost revenue, profits, or data. Total liability is limited to the amount paid to R4Referral
                  in the preceding 12 months.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">12. Governing Law &amp; Dispute Resolution</h2>
                <p>
                  These Terms are governed by the laws of Texas, USA.
                </p>
                <p className="mt-3">
                  Disputes shall be resolved through binding arbitration under AAA rules. Each party bears its own costs.
                  No class or collective actions are allowed.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">13. Force Majeure</h2>
                <p>R4Referral is not liable for delays or failures caused by events beyond our control, including:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Natural disasters</li>
                  <li>Strikes</li>
                  <li>War</li>
                  <li>Government actions</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">14. Notices</h2>
                <p>All notices must be in writing and sent to:</p>
                <p className="mt-3">
                  R4Referral LLC<br />
                  5900 Balcones Dr, Ste 100, Austin, TX 78731<br />
                  Email:{" "}
                  <a href="mailto:r4referral@gmail.com" className="text-brand-600 hover:underline">r4referral@gmail.com</a><br />
                  Phone:{" "}
                  <a href="tel:+15126780096" className="text-brand-600 hover:underline">+1 512-678-0096</a>
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">15. Entire Agreement</h2>
                <p>
                  These Terms, along with any Service or Referral Agreement and applicable policies (Refund, Privacy),
                  represent the complete agreement between you and R4Referral LLC. Prior agreements are superseded.
                </p>
                <p className="mt-3">
                  By using R4Referral services, you acknowledge that you have read, understood, and agreed to these
                  Terms &amp; Conditions.
                </p>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                <p className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Contact Us:</p>
                <p>
                  Phone:{" "}
                  <a href="tel:+15126780096" className="text-brand-600 hover:underline">+1 512-678-0096</a><br />
                  Email:{" "}
                  <a href="mailto:r4referral@gmail.com" className="text-brand-600 hover:underline">r4referral@gmail.com</a><br />
                  Website:{" "}
                  <a href="https://r4referral.com" className="text-brand-600 hover:underline">https://r4referral.com</a>
                </p>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  &copy; 2026 R4Referral LLC. All rights reserved.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
