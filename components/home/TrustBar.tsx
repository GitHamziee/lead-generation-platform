"use client";

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

function LogoStrip() {
  return (
    <div className="flex shrink-0 items-center gap-8 md:gap-16 pr-8 md:pr-16">
      {LOGOS.map((item) => (
        <div
          key={item.name}
          className="shrink-0 h-10 w-28 md:h-10 md:w-36 relative select-none opacity-60 dark:invert"
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
  );
}

export default function TrustBar() {
  return (
    <div className="w-full bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800 py-6 md:py-8">
      <p className="mb-4 md:mb-6 text-center text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
        Trusted by agents in top brokerages
      </p>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 md:w-20 bg-gradient-to-r from-white dark:from-slate-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 md:w-20 bg-gradient-to-l from-white dark:from-slate-950" />

        {/* w-max makes -50% = exactly one strip width → seamless loop */}
        <div className="flex w-max animate-marquee">
          <LogoStrip />
          <LogoStrip />
        </div>
      </div>
    </div>
  );
}
