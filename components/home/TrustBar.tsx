"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LOGOS = [
  { name: "eXp Realty", src: "/logos/exp-realty.svg" },
  { name: "Keller Williams", src: "/logos/keller-williams.svg" },
  { name: "Coldwell Banker", src: "/logos/coldwell-banker.svg" },
  { name: "Berkshire Hathaway", src: "/logos/berkshire-hathaway.svg" },
  { name: "RE/MAX", src: "/logos/remax.svg" },
  { name: "Century 21", src: "/logos/century-21.svg" },
  { name: "Compass", src: "/logos/compass.svg" },
  { name: "Sotheby's", src: "/logos/sothebys.svg" },
];

export default function TrustBar() {
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="w-full bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800 py-8"
    >
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
        Trusted by top brokerages
      </p>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white dark:from-slate-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white dark:from-slate-950" />

        <div className="flex animate-marquee items-center gap-16">
          {doubled.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="shrink-0 h-8 w-32 relative select-none grayscale opacity-50 dark:opacity-40 dark:invert"
              title={item.name}
            >
              <Image
                src={item.src}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
