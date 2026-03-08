import { Home, Headphones, Target, Globe, Image } from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const STATS = [
  { value: "2,500+", label: "Agents Onboard" },
  { value: "50K+", label: "Leads Delivered" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50", label: "States Covered" },
];

export const SERVICES = [
  {
    icon: Home,
    title: "Real Estate Lead Generation",
    description:
      "AI-powered, verified buyer and seller leads delivered directly to your inbox — pre-screened for genuine intent.",
    metric: "Multi-stage verification process",
    bullets: [
      "Hyper-local targeting by zip code, city, or county",
      "AI filtering eliminates fake and duplicate leads",
      "ISA-validated leads with confirmed contact info",
    ],
    href: "/services",
  },
  {
    icon: Headphones,
    title: "Virtual Assistant",
    description:
      "Dedicated virtual assistants who handle admin, follow-ups, and lead nurturing so you can focus on closing deals.",
    metric: "Save 20+ hrs/week on admin tasks",
    bullets: [
      "Trained VAs familiar with real estate workflows",
      "Lead follow-up and appointment scheduling",
      "CRM updates, transaction coordination, and more",
    ],
    href: "/services",
  },
  {
    icon: Target,
    title: "CRM Platform",
    description:
      "A purpose-built CRM to manage your leads, track deals, and streamline your entire sales process in one place.",
    metric: "100% lead tracking accuracy",
    bullets: [
      "Automated lead routing and status tracking",
      "Built-in follow-up reminders and task management",
      "Pipeline analytics and conversion reporting",
    ],
    href: "/services",
  },
  {
    icon: Image,
    title: "Virtual Staging",
    description:
      "Transform empty listings into beautifully staged properties with photorealistic virtual staging.",
    metric: "Listings sell 73% faster when staged",
    bullets: [
      "Photorealistic staging for any room type",
      "Multiple design styles to match buyer demographics",
      "Fast turnaround — staged photos in 24–48 hours",
    ],
    href: "/services",
  },
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Custom IDX-ready websites designed to capture leads and showcase your listings with a professional online presence.",
    metric: "3× higher lead capture rate",
    bullets: [
      "Mobile-responsive designs optimized for conversions",
      "IDX integration and property search functionality",
      "SEO-ready pages with integrated lead capture forms",
    ],
    href: "/services",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Sign Up & Set Preferences",
    description:
      "Tell us your target areas, property types, and lead preferences. We'll tailor everything to your market.",
  },
  {
    step: "02",
    title: "We Source & Verify Leads",
    description:
      "Our AI filters and ISA team validate every lead for genuine intent — no fakes, no duplicates, no tire-kickers.",
  },
  {
    step: "03",
    title: "Leads Delivered to You",
    description:
      "Verified leads are sent directly to your dashboard in real-time. Contact info, intent signals, and property details included.",
  },
  {
    step: "04",
    title: "Close & Grow",
    description:
      "Focus on what you do best — closing deals. Track your ROI with transparent reporting and scale when you're ready.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "I closed 3 deals in my first month using R4Referral leads. The quality is unmatched — every lead was pre-verified and ready to talk.",
    name: "Marcus T.",
    title: "Licensed Realtor",
    company: "eXp Realty",
    result: "3 closings in first 30 days",
  },
  {
    quote:
      "I've tried Zillow, Realtor.com, and others. R4Referral leads actually pick up the phone and are genuinely looking to buy or sell.",
    name: "Sarah K.",
    title: "Broker Associate",
    company: "Keller Williams",
    result: "12 verified leads in 60 days",
  },
  {
    quote:
      "The virtual assistant and CRM combo saved me 20+ hours a week. I can finally focus on showings and closings instead of admin work.",
    name: "David R.",
    title: "Real Estate Agent",
    company: "Coldwell Banker",
    result: "20+ hours saved per week",
  },
];

export const PRICING_PLANS = [
  {
    name: "Pay Per Lead",
    price: "$375",
    period: "one-time setup",
    description: "Only pay for the leads you receive. No commitment, no risk.",
    features: [
      "$375 one-time setup fee",
      "$100 per qualified lead",
      "Lifetime access — no expiry",
      "Pay as you go",
      "Lead details shown after payment",
      "Cancel anytime",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Bi-Annual",
    price: "$699",
    period: "/6 months",
    description:
      "Our most popular plan. High volume leads with performance-based pricing.",
    features: [
      "$699 for 6-month term",
      "12–15 qualified leads included",
      "15% commission per closing",
      "Lead info available immediately",
      "Re-activate after 6 months",
      "Priority support",
    ],
    cta: "Most Popular",
    highlighted: true,
  },
  {
    name: "Mega Bundle",
    price: "$825",
    period: "one-time",
    description:
      "Maximum value with guaranteed leads and the biggest savings.",
    features: [
      "$825 one-time payment",
      "10 guaranteed leads",
      "40% off standard pricing",
      "Lead info available immediately",
      "Plan expires after 10 leads",
      "Best value per lead",
    ],
    cta: "Best Value",
    highlighted: false,
  },
];

export const PRICING_FAQ = [
  {
    question: "How does Pay Per Lead work?",
    answer:
      "You pay a one-time $375 setup fee, then $100 for each qualified lead we deliver. There's no expiry — your account stays active for life. Lead details are shared after payment.",
  },
  {
    question: "What's included in the Bi-Annual plan?",
    answer:
      "For $699 you get 12–15 qualified leads over a 6-month period, plus a 15% commission on each successful closing. Lead information is available immediately. You can re-activate after the term ends.",
  },
  {
    question: "How does the Mega Bundle expire?",
    answer:
      "The Mega Bundle gives you 10 guaranteed leads at 40% off. Once all 10 leads have been delivered, the plan is complete. It's the best value per lead we offer.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes. You can upgrade or switch plans at any time. Contact our team and we'll help you transition to the plan that fits your needs.",
  },
  {
    question: "How quickly will I start receiving leads?",
    answer:
      "Most agents start receiving verified leads within 3–5 business days of signing up and setting their targeting preferences.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We deliver leads across all 50 US states with hyper-local targeting. You can specify zip codes, cities, or counties to match your farm area.",
  },
];

export const TEAM_MEMBERS = [
  {
    name: "James Harlow",
    title: "Founder & CEO",
    image: null,
  },
  {
    name: "Priya Anand",
    title: "Head of Operations",
    image: null,
  },
  {
    name: "Carlos Mendez",
    title: "Director of Training",
    image: null,
  },
  {
    name: "Leah Fontaine",
    title: "Client Success Manager",
    image: null,
  },
];

export const FOOTER_LINKS = {
  services: [
    { label: "Lead Generation", href: "/services" },
    { label: "Virtual Assistant", href: "/services" },
    { label: "CRM Platform", href: "/services" },
    { label: "Virtual Staging", href: "/services" },
    { label: "Website Development", href: "/services" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};

export const US_STATES = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "District of Columbia", value: "DC" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

/** O(1) lookup: state code → full label (e.g. "FL" → "Florida") */
export const US_STATE_MAP = new Map(US_STATES.map((s) => [s.value, s.label]));
