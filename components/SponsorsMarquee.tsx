"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { sponsors } from "@/data/event";

export default function SponsorsMarquee() {
  // Duplicate array 3x to guarantee seamless infinite loop scrolling
  const marqueeItems = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section id="sponsors" className="py-20 relative bg-ink/95 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono uppercase tracking-widest text-neonblue">
            [ 04 // BACKED BY INDUSTRY LEADERS ]
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-bold mt-2 text-white">
            SPONSORS & PARTNERS
          </h2>
        </motion.div>
      </div>

      {/* Marquee Track Container */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left Gradient Fade */}
        <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-ink to-transparent pointer-events-none" />
        
        {/* Right Gradient Fade */}
        <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-ink to-transparent pointer-events-none" />

        {/* Marquee Loop */}
        <div className="animate-marquee flex items-center gap-8 sm:gap-12">
          {marqueeItems.map((sponsor, idx) => (
            <div
              key={idx}
              className="glass-panel px-8 py-4 rounded-xl flex items-center justify-center min-w-[180px] h-20 hover:border-neonblue/60 transition-all group shrink-0"
            >
              <div className="relative w-32 h-10 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image
                  src={sponsor.logoPath}
                  alt={sponsor.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
