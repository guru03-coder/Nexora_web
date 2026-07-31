"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { juries, JuryMember } from "@/data/event";
import { Linkedin, Crown, ShieldCheck, Sparkles, Award } from "lucide-react";

export default function JuriesSection() {
  const chiefGuests = juries.filter((item) => item.category === "Chief Guest");
  const juryMembers = juries.filter((item) => item.category !== "Chief Guest");

  return (
    <section id="juries" className="py-16 sm:py-20 relative bg-ink border-t border-white/5 overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#00E5FF]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-2"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-crimson-glow">
            [ 02 // HONORARY GUESTS & EXPERT EVALUATORS ]
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            CHIEF GUEST & <span className="metal-gradient">JURY PANEL</span>
          </h2>
          <p className="text-gray-400 font-sans text-xs sm:text-sm">
            Distinguished industry leaders and mentor evaluators guiding NEXORA 2026.
          </p>
        </motion.div>

        {/* ================= SUBSECTION 1: CHIEF GUEST SPECIALIZATION ================= */}
        <div className="space-y-5">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/60" />
            <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/50 text-amber-300 font-mono text-[11px] font-bold tracking-widest uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.25)]">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>HONORARY CHIEF GUEST & KEYNOTE SPEAKER</span>
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/60" />
          </div>

          <div className="max-w-2xl mx-auto">
            {chiefGuests.map((person: JuryMember) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-2xl border-2 border-amber-400/80 shadow-[0_0_40px_rgba(251,191,36,0.3)] bg-gradient-to-r from-amber-950/70 via-ink to-black flex flex-col sm:flex-row overflow-hidden group relative"
              >
                {/* Gold Top Accent Line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 z-30" />

                {/* Compact Photo Frame with Object-Top Position */}
                <div className="relative w-full sm:w-52 h-56 sm:h-auto bg-black/70 overflow-hidden flex items-center justify-center p-3 flex-shrink-0">
                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-ink/95 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>CHIEF EXECUTIVE</span>
                      </span>
                      {person.linkedin && (
                        <a
                          href={person.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/50 text-amber-300 hover:bg-amber-500/30 text-xs font-mono transition-all"
                          aria-label={`${person.name} LinkedIn`}
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white group-hover:text-amber-300 transition-colors">
                      {person.name}
                    </h3>

                    <div>
                      <p className="text-xs font-mono text-amber-400 font-bold">
                        {person.role}
                      </p>
                      <p className="text-[11px] text-gray-300 font-sans">
                        {person.company}
                      </p>
                    </div>

                    <p className="text-xs text-gray-300 font-sans leading-relaxed">
                      {person.bio}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-[10px] font-mono text-amber-400/80 font-semibold uppercase tracking-wider">
                    <span>// CHIEF GUEST OF HONOR</span>
                    <span className="text-amber-300 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> NEXORA 2026
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= SUBSECTION 2: JURY PANEL ================= */}
        <div className="space-y-5">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono text-[11px] font-bold tracking-widest uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>EXPERT JURY PANEL</span>
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
            {juryMembers.map((person: JuryMember, idx: number) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass-panel rounded-2xl border border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] bg-gradient-to-r from-cyan-950/30 via-ink to-black flex flex-col sm:flex-row overflow-hidden group relative"
              >
                {/* Header Tag */}
                <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-400">
                  JUDGE 0{idx + 1}
                </div>

                {/* Compact Photo Frame with Object-Top Position */}
                <div className="relative w-full sm:w-40 h-44 sm:h-auto bg-black/70 overflow-hidden flex items-center justify-center p-2.5 shrink-0">
                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-cyan-400/40 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 flex flex-col justify-between flex-grow bg-ink/95 space-y-2">
                  <div className="space-y-1">
                    <h3 className="text-base font-display font-bold text-white group-hover:text-cyan-400 transition-colors pr-14">
                      {person.name}
                    </h3>
                    <p className="text-xs font-mono font-semibold text-cyan-400">
                      {person.role}
                    </p>
                    <p className="text-[11px] text-gray-400 font-sans">
                      {person.company}
                    </p>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed pt-1">
                      {person.bio}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                      // OFFICIAL JURY
                    </span>
                    {person.linkedin ? (
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:text-white transition-all text-xs font-mono"
                        aria-label={`${person.name} LinkedIn`}
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>LinkedIn</span>
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono text-cyan-400/70">EVALUATOR</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
