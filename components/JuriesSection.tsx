"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { juries, JuryMember } from "@/data/event";
import { Linkedin, Crown, ShieldCheck, Sparkles } from "lucide-react";

export default function JuriesSection() {
  return (
    <section id="juries" className="py-24 relative bg-ink border-t border-white/5 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00E5FF]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-crimson-glow">
            [ 02 // EXPERT PANEL & HONORARY GUESTS ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold mt-2 mb-4">
            CHIEF GUEST & <span className="metal-gradient">JURIES</span>
          </h2>
          <p className="text-gray-400 font-sans text-base sm:text-lg">
            Distinguished industry leaders, veteran engineering mentors, and visionary chief guests guiding NEXORA 2026.
          </p>
        </motion.div>

        {/* Flashcard Line-by-Line 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {juries.map((person: JuryMember, idx: number) => {
            const isChiefGuest = person.category === "Chief Guest" || idx === 0;

            return (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`glass-panel rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group relative ${
                  isChiefGuest
                    ? "border-2 border-amber-400/70 shadow-[0_0_35px_rgba(251,191,36,0.25)] bg-gradient-to-b from-amber-950/30 via-ink to-black"
                    : "border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] bg-ink/90"
                }`}
              >
                {/* Cyber Category Badge / Top Header Tag */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
                  {isChiefGuest ? (
                    <span className="bg-gradient-to-r from-amber-500/30 to-amber-900/60 border border-amber-400/80 text-amber-300 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-[0_0_12px_rgba(251,191,36,0.4)]">
                      <Crown className="w-3.5 h-3.5 text-amber-400" />
                      <span>CHIEF GUEST</span>
                    </span>
                  ) : (
                    <span className="bg-cyan-950/80 border border-cyan-500/50 text-cyan-400 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>JURY MEMBER</span>
                    </span>
                  )}
                </div>

                {/* Card Number Pill on Right */}
                <div className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-gray-400">
                  CARD 0{idx + 1}
                </div>

                {/* Flashcard Image Frame */}
                <div className={`relative w-full h-72 sm:h-80 bg-black/60 overflow-hidden flex items-center justify-center p-3 ${
                  isChiefGuest ? "pt-12" : "pt-12"
                }`}>
                  <div className={`relative w-full h-full rounded-xl overflow-hidden ${
                    isChiefGuest ? "border-2 border-amber-400/50" : "border border-cyan-400/30"
                  }`}>
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Bottom Gradient Fade on Image */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink to-transparent pointer-events-none" />
                </div>

                {/* Flashcard Body Content */}
                <div className="p-5 flex flex-col flex-grow justify-between border-t border-white/5 bg-ink/90">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`text-lg font-display font-bold transition-colors ${
                        isChiefGuest ? "text-white group-hover:text-amber-300" : "text-white group-hover:text-cyan-400"
                      }`}>
                        {person.name}
                      </h3>
                      {isChiefGuest && <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                    </div>

                    <p className={`text-xs font-mono mt-1 font-semibold ${
                      isChiefGuest ? "text-amber-400" : "text-cyan-400"
                    }`}>
                      {person.role}
                    </p>
                    <p className="text-xs text-gray-400 font-sans mt-0.5 mb-3">
                      {person.company}
                    </p>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed line-clamp-3">
                      {person.bio}
                    </p>
                  </div>

                  {/* Social Action Link */}
                  {person.linkedin && (
                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                      <span className={`text-[10px] font-mono uppercase tracking-widest ${
                        isChiefGuest ? "text-amber-400/80 font-bold" : "text-gray-500"
                      }`}>
                        {isChiefGuest ? "// CHIEF GUEST PANEL" : "// OFFICIAL PANEL"}
                      </span>
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors p-1.5 rounded-lg border ${
                          isChiefGuest
                            ? "bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-500/20"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-cyan-400 hover:bg-white/10"
                        }`}
                        aria-label={`${person.name} LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
