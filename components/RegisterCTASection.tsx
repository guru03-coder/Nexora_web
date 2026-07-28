"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { event } from "@/data/event";

interface RegisterCTASectionProps {
  onRegisterClick: () => void;
}

export default function RegisterCTASection({ onRegisterClick }: RegisterCTASectionProps) {
  return (
    <section id="register" className="relative py-28 bg-ink overflow-hidden">
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-crimson/40 p-8 sm:p-14 text-center backdrop-blur-xl shadow-2xl shadow-crimson/20 space-y-8">
          
          {/* Urgency Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crimson/20 border border-crimson/50 text-crimson-glow text-xs font-mono font-bold uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
            <span>SEATS FILLING FAST // LIMITED CAPACITY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight"
          >
            READY TO BUILD BEYOND <span className="metal-gradient">LIMITS?</span>
          </motion.h2>

          <p className="text-gray-300 font-sans text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Join 5,000+ developers, researchers, and innovators in {event.city} on {event.dateRange}. Claim your access token now.
          </p>

          {/* CTA & QR Code Box */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-8">
            {/* Button */}
            <button
              onClick={onRegisterClick}
              className="px-10 py-5 rounded-2xl font-display text-sm font-bold tracking-widest text-white bg-crimson hover:bg-crimson-glow shadow-2xl shadow-crimson/50 hover:shadow-crimson/80 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 uppercase"
            >
              <span>REGISTER NOW</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* QR Code Container */}
            <div className="flex items-center gap-4 bg-ink/80 p-3 rounded-2xl border border-white/10">
              <div className="relative w-20 h-20 bg-white rounded-xl p-1.5 overflow-hidden">
                <Image
                  src="/qr/nexora-qr.png"
                  alt="NEXORA Registration QR Code"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left font-mono text-xs text-gray-400">
                <span className="text-white font-bold block">SCAN TO REGISTER</span>
                <span>Mobile Fast-Pass</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
