"use client";

import React from "react";
import Image from "next/image";
import { sponsors } from "@/data/event";

export default function SponsorsMarquee() {
  // Duplicate array to ensure seamless infinite loop
  const marqueeSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section id="sponsors" className="relative py-24 bg-ink/90 border-b border-white/5 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-crimson/10 border border-crimson/30 font-mono text-xs text-crimson-glow uppercase tracking-widest mb-4">
          [ 04 // SPONSORS & PARTNERS ]
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
          POWERED BY INDUSTRY <span className="metal-gradient">LEADERS</span>
        </h2>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden py-4 flex items-center">
        {/* Left/Right Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex animate-marquee space-x-12 items-center whitespace-nowrap">
          {marqueeSponsors.map((sponsor, idx) => (
            <div
              key={`${sponsor.name}-${idx}`}
              className="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-crimson/50 transition-all duration-300 min-w-[200px] justify-center group"
            >
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
                <Image
                  src={sponsor.logoPath}
                  alt={sponsor.name}
                  width={40}
                  height={40}
                  className="object-contain p-1 filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    // Fallback avatar if logo fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display text-sm font-bold text-gray-200 group-hover:text-white transition-colors">
                  {sponsor.name}
                </span>
                {sponsor.tier && (
                  <span className="font-mono text-[10px] text-gray-400">
                    {sponsor.tier}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
