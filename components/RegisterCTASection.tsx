"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { QrCode, Sparkles, ArrowRight } from "lucide-react";
import { event } from "@/data/event";

interface RegisterCTASectionProps {
  onRegisterClick: () => void;
}

export default function RegisterCTASection({ onRegisterClick }: RegisterCTASectionProps) {
  return (
    <section id="register" className="py-28 relative bg-ink border-t border-white/5 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neonblue/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-8 sm:p-14 border border-neonblue/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] relative overflow-hidden"
        >
          {/* Top urgency tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neonblue/20 border border-neonblue/40 text-neonblue text-xs font-mono font-bold tracking-widest uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SEATS FILLING FAST • LIMITED SPOTS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight mb-4">
                READY TO SHAPE THE <span className="metal-gradient">NEXT ERA?</span>
              </h2>
              <p className="text-gray-300 font-sans text-base sm:text-lg mb-8 leading-relaxed">
                Join 5,000+ top builders, engineers, and researchers at {event.city} on {event.dateRange}. Claim your access pass before registration closes.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onRegisterClick}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-neonblue via-[#00D2FF] to-[#0072FF] text-black font-display text-sm font-extrabold uppercase tracking-wider shadow-[0_0_30px_rgba(0,240,255,0.7)] hover:shadow-[0_0_50px_rgba(0,240,255,1)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <QrCode className="w-5 h-5" />
                  <span>Register Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center sm:text-left text-xs font-mono text-gray-400 py-2">
                  <span>100% Free Entry</span> • <span>Free Compute Grants</span>
                </div>
              </div>
            </div>

            {/* Right QR Visual */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div
                onClick={onRegisterClick}
                className="group relative cursor-pointer bg-white p-4 rounded-2xl border-2 border-neonblue/60 shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:scale-105 transition-all duration-300"
              >
                <div className="relative w-48 h-48">
                  <Image
                    src="/qr/nexora-qr.png"
                    alt="Registration QR Code"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute inset-0 bg-neonblue/90 backdrop-blur-xs rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-black font-display text-xs font-extrabold uppercase tracking-wider transition-opacity duration-300">
                  Click to Expand
                </div>
              </div>
              <span className="text-xs font-mono text-gray-400 mt-3">
                Scan with phone camera to register
              </span>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
