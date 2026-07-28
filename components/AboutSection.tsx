"use client";

import React from "react";
import { motion } from "framer-motion";
import { event } from "@/data/event";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 bg-ink border-t border-b border-white/5 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-crimson/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-crimson/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Section Header & Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-crimson/10 border border-crimson/30 font-mono text-xs text-crimson-glow uppercase tracking-widest">
              [ 01 // ABOUT THE EVENT ]
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              ARCHITECTING THE <span className="metal-gradient">NEXT ERA</span> OF DEEP-TECH
            </h2>

            <p className="font-serif italic text-xl text-gray-300 font-light">
              &ldquo;Where human intuition collides with autonomous intelligence.&rdquo;
            </p>

            <div className="pt-4 flex items-center gap-6 font-mono text-xs text-gray-400">
              <div>
                <span className="text-white text-xl font-bold font-display block">48 HOURS</span>
                <span>NON-STOP HACKING</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="text-white text-xl font-bold font-display block">5,000+</span>
                <span>GLOBAL BUILDERS</span>
              </div>
            </div>
          </motion.div>

          {/* Description Content & Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 text-gray-300 font-sans text-base sm:text-lg leading-relaxed"
          >
            <p className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
              Presented by <strong className="text-white font-semibold">{event.presentedBy}</strong>, <strong className="text-crimson-glow font-bold">{event.name}</strong> is a high-octane 48-hour hackathon bringing together visionary developers, artificial intelligence researchers, and hardware hackers in {event.city}.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-ink/80 border border-crimson/20 hover:border-crimson/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-crimson/10 border border-crimson/40 flex items-center justify-center text-crimson font-bold text-lg mb-3">
                  🧠
                </div>
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-1">
                  Agentic Autonomy
                </h3>
                <p className="text-xs text-gray-400">
                  Build multi-agent frameworks capable of complex reasoning, autonomous decision loops, and tool orchestration.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-ink/80 border border-crimson/20 hover:border-crimson/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-crimson/10 border border-crimson/40 flex items-center justify-center text-crimson font-bold text-lg mb-3">
                  🔗
                </div>
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-1">
                  Zero-Knowledge & Web3
                </h3>
                <p className="text-xs text-gray-400">
                  Architect privacy-preserving, verifiable cryptographic proofs and decentralized model execution enclaves.
                </p>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
