"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { juries, JuryMember } from "@/data/event";
import { Linkedin, Crown, ShieldCheck, Sparkles } from "lucide-react";

export default function JuriesSection() {
  const chiefGuests = juries.filter((item) => item.category === "Chief Guest");
  const juryMembers = juries.filter((item) => item.category !== "Chief Guest");

  return (
    <section id="juries" className="py-24 relative bg-ink border-t border-white/5 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00E5FF]/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-crimson-glow">
            [ 02 // HONORARY GUESTS & EXPERT EVALUATORS ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold mt-2 mb-4">
            CHIEF GUEST & <span className="metal-gradient">JURY PANEL</span>
          </h2>
          <p className="text-gray-400 font-sans text-base sm:text-lg">
            Distinguished industry leaders, veteran engineering mentors, and visionary chief guests guiding NEXORA 2026.
          </p>
        </motion.div>

        {/* ================= SUBSECTION 1: CHIEF GUEST ================= */}
        <div className="space-y-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>CHIEF GUEST OF HONOR</span>
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>

          <div className="max-w-xl mx-auto">
            {chiefGuests.map((person: JuryMember, idx: number) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-panel rounded-3xl border-2 border-amber-400/70 shadow-[0_0_40px_rgba(251,191,36,0.25)] bg-gradient-to-b from-amber-950/40 via-ink to-black flex flex-col sm:flex-row overflow-hidden group relative"
              >
                {/* Image Frame */}
                <div className="relative w-full sm:w-64 h-72 sm:h-auto bg-black/60 overflow-hidden flex items-center justify-center p-4 flex-shrink-0">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-amber-400/50 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow bg-ink/90">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-amber-300 transition-colors">
                        {person.name}
                      </h3>
                      <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    </div>

                    <div>
                      <p className="text-sm font-mono text-amber-400 font-bold">
                        {person.role}
                      </p>
                      <p className="text-xs text-gray-300 font-sans mt-0.5">
                        {person.company}
                      </p>
                    </div>

                    <p className="text-xs text-gray-300 font-sans leading-relaxed">
                      {person.bio}
                    </p>
                  </div>

                  {person.linkedin && (
                    <div className="pt-4 mt-6 border-t border-amber-500/20 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-amber-400/80 font-bold uppercase tracking-wider">
                        // CHIEF GUEST
                      </span>
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-300 hover:bg-amber-500/20 text-xs font-mono transition-all"
                        aria-label={`${person.name} LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= SUBSECTION 2: JURY PANEL ================= */}
        <div className="space-y-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>EXPERT JURY PANEL</span>
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {juryMembers.map((person: JuryMember, idx: number) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-panel rounded-3xl border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] bg-ink/90 flex flex-col justify-between overflow-hidden group relative"
              >
                {/* Header Tag */}
                <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-400">
                  JUDGE 0{idx + 1}
                </div>

                {/* Photo Frame */}
                <div className="relative w-full h-72 bg-black/60 overflow-hidden flex items-center justify-center p-3">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-cyan-400/30">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink to-transparent pointer-events-none" />
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-grow justify-between border-t border-white/5 bg-ink/90">
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-xs font-mono font-semibold text-cyan-400">
                      {person.role}
                    </p>
                    <p className="text-xs text-gray-400 font-sans">
                      {person.company}
                    </p>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed pt-1">
                      {person.bio}
                    </p>
                  </div>

                  {person.linkedin && (
                    <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        // OFFICIAL JURY
                      </span>
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
                        aria-label={`${person.name} LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
