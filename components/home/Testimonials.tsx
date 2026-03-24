import { Quote } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Badge from "@/components/shared/Badge";

/* ─────────────────────────────────────────────────────────────
   VIDEO VERSION — kept for reference, swap back if needed
   ─────────────────────────────────────────────────────────────

import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-500/40 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl translate-y-1/3 -translate-x-1/3" />
      <div className="grid-pattern absolute inset-0 opacity-10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 border-white/30 bg-white/10 text-white">
            Client Reviews
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Hear It From <span className="text-accent-300">Our Clients</span>
          </h2>
          <p className="mt-4 text-brand-100 max-w-xl mx-auto">
            Real stories from agents who've grown their business with R4Referral.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.12}>
              <div className="flex flex-col h-full">
                <div className="relative rounded-t-2xl overflow-hidden bg-black/20 border border-b-0 border-white/20 flex justify-center">
                  <div className="aspect-[9/16] max-h-[400px] w-full max-w-[225px] md:max-w-none">
                    <iframe
                      src={`${t.videoUrl}?rel=0&modestbranding=1`}
                      title={`${t.name} video review`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 rounded-b-2xl bg-white/10 border border-t-0 border-white/20 p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex rounded-full bg-white/20 border border-white/25 px-3 py-1 text-xs font-semibold text-accent-200">
                      {t.result}
                    </span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className="text-amber-300 text-sm">★</span>
                      ))}
                    </div>
                  </div>
                  <Quote className="h-6 w-6 text-white/30 mb-2" />
                  <p className="text-brand-50 leading-relaxed text-sm flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3 pt-4 border-t border-white/15">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-brand-400 text-white text-sm font-bold flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-brand-200">{t.title} · {t.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
───────────────────────────────────────────────────────────── */

const REVIEWS = [
  {
    quote: "I'd tried a couple other referral services before and honestly wasn't expecting much. But the first referral I got from R4Referral actually picked up the phone — and we closed in under a month. That doesn't happen with leads from Zillow.",
    name: "Marcus T.",
    title: "Licensed Realtor",
    company: "eXp Realty",
    result: "3 closings in first 30 days",
    initials: "MT",
  },
  {
    quote: "I was burning through my mornings just chasing people who never responded. With R4Referral, the referrals come in already warmed up. They know what they want. I spend way less time qualifying and a lot more time closing.",
    name: "Sarah K.",
    title: "Broker Associate",
    company: "Keller Williams",
    result: "12 verified referrals in 60 days",
    initials: "SK",
  },
  {
    quote: "The VA took over my scheduling and follow-up game completely. I used to drop the ball on callbacks — it was embarrassing. Now nothing falls through. My clients actually comment on how responsive I am, which was never the case before.",
    name: "David R.",
    title: "Real Estate Agent",
    company: "Coldwell Banker",
    result: "20+ hours saved weekly",
    initials: "DR",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-500/40 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl translate-y-1/3 -translate-x-1/3" />
      <div className="grid-pattern absolute inset-0 opacity-10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <Badge className="mb-4 border-white/30 bg-white/10 text-white">
            Client Reviews
          </Badge>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Hear It From{" "}
            <span className="text-accent-300">Our Clients</span>
          </h2>
          <p className="mt-4 text-brand-100 max-w-xl mx-auto">
            Real agents, real results. Here&apos;s what they&apos;re saying.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <AnimatedSection key={r.name} delay={i * 0.1}>
              <div className="flex flex-col h-full rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur-sm">
                {/* Result badge + Stars */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex rounded-full bg-white/20 border border-white/25 px-3 py-1 text-xs font-semibold text-accent-200">
                    {r.result}
                  </span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-amber-300 text-sm">★</span>
                    ))}
                  </div>
                </div>

                <Quote className="h-5 w-5 text-white/25 mb-3" />
                <p className="text-brand-50 leading-relaxed text-sm flex-1">
                  &ldquo;{r.quote}&rdquo;
                </p>

                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-white/15">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-brand-400 text-white text-xs font-bold flex-shrink-0">
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{r.name}</p>
                    <p className="text-xs text-brand-200">{r.title} · {r.company}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
