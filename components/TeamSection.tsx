"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { teamMembers, TeamMember } from "@/data/event";
import { Linkedin, Users, ChevronDown, Sparkles, RefreshCw } from "lucide-react";

export default function TeamSection() {
  const [revealedCount, setRevealedCount] = useState<number>(1);

  const handleRevealNext = () => {
    setRevealedCount((prev) => (prev < teamMembers.length ? prev + 1 : prev));
  };

  const handleToggleAll = () => {
    if (revealedCount === teamMembers.length) {
      setRevealedCount(1);
    } else {
      setRevealedCount(teamMembers.length);
    }
  };

  return (
    <section id="team" className="py-24 relative bg-ink border-t border-white/5 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-crimson/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-crimson-glow flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-crimson-glow" />
            <span>[ 06 // CORE ORGANIZING TEAM ]</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold mt-2 mb-4">
            ORGANIZING <span className="metal-gradient">TEAM</span>
          </h2>
          <p className="text-gray-400 font-sans text-base sm:text-lg mb-6">
            The visionary minds and operational leads engineering NEXORA 2026.
          </p>

          {/* Interactive Line-by-Line Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleRevealNext}
              disabled={revealedCount >= teamMembers.length}
              className={`px-6 py-3 rounded-full font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.4)] ${
                revealedCount < teamMembers.length
                  ? "bg-crimson hover:bg-crimson-glow text-black cursor-pointer hover:scale-105"
                  : "bg-white/10 text-gray-500 cursor-not-allowed border border-white/10"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {revealedCount < teamMembers.length
                  ? `CLICK TO REVEAL NEXT MEMBER (${revealedCount}/${teamMembers.length})`
                  : "ALL 4 MEMBERS REVEALED"}
              </span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>

            <button
              onClick={handleToggleAll}
              className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-gray-300 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-crimson-glow" />
              <span>{revealedCount === teamMembers.length ? "COLLAPSE TO 1" : "SHOW ALL 4"}</span>
            </button>
          </div>
        </motion.div>

        {/* 4 Line-by-Line Stacked Flashcards */}
        <div className="space-y-6">
          <AnimatePresence>
            {teamMembers.slice(0, revealedCount).map((member: TeamMember, idx: number) => {
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={handleRevealNext}
                  className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/15 hover:border-crimson/80 hover:shadow-[0_0_35px_rgba(0,229,255,0.25)] transition-all duration-300 group cursor-pointer relative overflow-hidden"
                >
                  {/* Glowing Edge Indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-crimson to-crimson-dark group-hover:w-2 transition-all duration-300" />

                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pl-2 sm:pl-4">
                    
                    {/* Left Info Column */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left w-full md:w-auto">
                      
                      {/* Avatar Image */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-crimson/50 bg-black/60 shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center justify-center p-2">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      {/* Content Info */}
                      <div className="space-y-2 max-w-xl">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                          <span className="px-2.5 py-0.5 rounded-md bg-crimson/20 border border-crimson/40 text-crimson-glow text-[10px] font-mono font-bold tracking-widest uppercase">
                            CARD 0{idx + 1}
                          </span>
                          <span className="text-xs font-mono font-bold text-crimson-glow bg-black/50 px-3 py-0.5 rounded-full border border-crimson/30">
                            {member.role}
                          </span>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-white group-hover:text-crimson-glow transition-colors">
                          {member.name}
                        </h3>

                        <p className="text-xs font-mono text-gray-400">
                          ORGANIZATION: <span className="text-white font-semibold">{member.company}</span>
                        </p>

                        <p className="text-sm text-gray-300 font-sans leading-relaxed pt-1">
                          {member.bio}
                        </p>
                      </div>
                    </div>

                    {/* Right Social Action & Click Reveal Trigger */}
                    <div className="flex flex-col items-center md:items-end gap-3 shrink-0 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-white/10">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-crimson/20 border border-white/20 hover:border-crimson/60 text-white hover:text-crimson-glow font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                        >
                          <Linkedin className="w-4 h-4 text-crimson-glow" />
                          <span>CONNECT</span>
                        </a>
                      )}

                      {revealedCount < teamMembers.length && idx === revealedCount - 1 && (
                        <span className="text-[10px] font-mono text-crimson-glow animate-pulse flex items-center gap-1">
                          [ TAP CARD TO REVEAL NEXT LINE ]
                        </span>
                      )}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Step Indicator Bar at Bottom */}
        <div className="mt-8 flex items-center justify-between text-xs font-mono text-gray-400 border-t border-white/10 pt-4">
          <span>LINE REVEAL MODE: ACTIVE</span>
          <span className="text-crimson-glow">
            {revealedCount} OF {teamMembers.length} CARDS VISIBLE
          </span>
        </div>

      </div>
    </section>
  );
}
