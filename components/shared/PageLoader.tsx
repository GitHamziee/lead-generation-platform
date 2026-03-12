"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function PageLoader() {
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Only show on first visit in this browser session
    if (sessionStorage.getItem("r4referral_loaded")) {
      setGone(true);
      return;
    }

    setShow(true);
    sessionStorage.setItem("r4referral_loaded", "1");

    const fadeTimer = setTimeout(() => setFading(true), 1600);
    const removeTimer = setTimeout(() => setGone(true), 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (gone || !show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-slate-950 transition-opacity duration-500 ease-in-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <div className="mb-10 animate-[fadeUp_0.5s_ease_forwards]">
        <Image src="/logo.png" alt="R4Referral" width={40} height={40} className="h-[40px] w-[40px] object-contain dark:brightness-0 dark:invert" />
      </div>

      {/* Progress bar track */}
      <div className="w-40 h-0.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full w-full bg-brand-600 rounded-full origin-left"
          style={{ animation: "loader-bar 1.5s cubic-bezier(0.4,0,0.2,1) forwards" }}
        />
      </div>
    </div>
  );
}
