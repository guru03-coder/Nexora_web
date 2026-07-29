"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { juries } from "@/data/event";
import { Linkedin, UserCheck, Award } from "lucide-react";

export default function MobileJuriesSection() {
  return (
    <section id="juries" className="py-16 px-4 bg-ink relative z-10 border-t border-cyan-500/20">
      <div className="max-w-md mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-widest">
            <UserCheck className="w-3 h-3 text-cyan-400" />
            <span>HONORED GUESTS & EVALUATORS</span>
          </div>
          <h2 className="text-2xl font-display font-extrabold text-white">
            JURIES & <span className="text-cyan-400">CHIEF GUESTS</span>
          </h2>
          <p className="text-xs text-gray-300">
            Meet the industry leaders, executives, and mentors evaluating NEXORA 2026.
          </p>
        </div>

        {/* 1-Column Flashcards for Mobile */}
        <div className="space-y-6">
          {juries.map((jury, idx) => (
            <motion.div
              key={jury.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-white/5 border border-cyan-500/40 space-y-4 relative overflow-hidden backdrop-blur-sm shadow-[0_0_20px_rgba(0,229,255,0.15)]"
            >
              {/* Header Telemetry Badge */}
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">
                  JUDGE 0{idx + 1}
                </span>
                <Award className="w-4 h-4 text-cyan-400" />
              </div>

              {/* Photo & Identity */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-cyan-400/60 shrink-0 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  <Image
                    src={jury.image}
                    alt={jury.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <h3 className="text-base font-display font-extrabold text-white truncate">
                    {jury.name}
                  </h3>
                  <p className="text-xs font-mono font-semibold text-cyan-300 truncate">
                    {jury.role}
                  </p>
                  <p className="text-[11px] text-gray-400 truncate">
                    {jury.company}
                  </p>
                </div>
              </div>

              {/* LinkedIn Button */}
              <div className="pt-2">
                <a
                  href={jury.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-400 hover:text-black border border-cyan-500/40 text-cyan-300 font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
