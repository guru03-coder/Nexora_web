"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { teamMembers, TeamMember } from "@/data/event";
import { Linkedin, Users, ChevronRight, ChevronLeft, Layers, Sparkles } from "lucide-react";

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // 1 = next, -1 = prev

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleSelectCard = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <section id="team" className="py-24 relative bg-ink border-t border-white/5 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-crimson/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-crimson-glow flex items-center justify-center gap-2">
            <Layers className="w-4 h-4 text-crimson-glow" />
            <span>[ 06 // CORE ORGANIZING TEAM ]</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold mt-2 mb-3">
            ORGANIZING <span className="metal-gradient">TEAM</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base mb-6">
            Click on the card deck to flip through the core leads behind NEXORA 2026.
          </p>

          {/* Card Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {teamMembers.map((member: TeamMember, idx: number) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={member.id}
                  onClick={() => handleSelectCard(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-crimson text-black shadow-[0_0_20px_rgba(0,229,255,0.6)] scale-105"
                      : "bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? "bg-black animate-ping" : "bg-gray-500"}`} />
                  <span>CARD 0{idx + 1}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 3D Stack of Cards Container */}
        <div className="relative h-[380px] sm:h-[320px] max-w-3xl mx-auto flex items-center justify-center my-8">
          {teamMembers.map((member: TeamMember, idx: number) => {
            // Calculate stack position relative to activeIndex (0 = top card)
            const stackPosition = (idx - activeIndex + teamMembers.length) % teamMembers.length;
            const isTop = stackPosition === 0;

            // Stack transform values
            const offsetY = stackPosition * 16; // 0px, 16px, 32px, 48px
            const scale = 1 - stackPosition * 0.05; // 1, 0.95, 0.90, 0.85
            const zIndex = teamMembers.length - stackPosition; // 4, 3, 2, 1
            const opacity = 1 - stackPosition * 0.18; // 1, 0.82, 0.64, 0.46

            return (
              <motion.div
                key={member.id}
                initial={false}
                animate={{
                  y: offsetY,
                  scale: scale,
                  zIndex: zIndex,
                  opacity: opacity,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={handleNext}
                className={`absolute inset-x-0 mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 hover:border-crimson/80 transition-all duration-300 cursor-pointer overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.8)] ${
                  isTop
                    ? "shadow-[0_0_35px_rgba(0,229,255,0.25)] border-crimson/60"
                    : "pointer-events-auto"
                }`}
                style={{
                  transformOrigin: "top center",
                }}
              >
                {/* Glowing Left Accent */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-crimson to-crimson-dark" />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pl-2">
                  
                  {/* Avatar */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-crimson/50 bg-black/70 shrink-0 shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center justify-center p-2">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Member Details */}
                  <div className="space-y-2 text-center sm:text-left flex-grow">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-crimson/20 border border-crimson/40 text-crimson-glow text-[10px] font-mono font-bold tracking-widest uppercase">
                        CARD 0{idx + 1} DECK
                      </span>
                      <span className="text-xs font-mono font-bold text-crimson-glow bg-black/60 px-3 py-0.5 rounded-full border border-crimson/30">
                        {member.role}
                      </span>
                    </div>

                    <h3 className="text-2xl font-display font-bold text-white">
                      {member.name}
                    </h3>

                    <p className="text-xs font-mono text-gray-400">
                      ORGANIZATION: <span className="text-white font-semibold">{member.company}</span>
                    </p>

                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed line-clamp-2">
                      {member.bio}
                    </p>
                  </div>

                  {/* LinkedIn Action */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 rounded-full bg-white/5 hover:bg-crimson/20 border border-white/20 hover:border-crimson/60 text-white hover:text-crimson-glow font-display text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                      >
                        <Linkedin className="w-4 h-4 text-crimson-glow" />
                        <span>CONNECT</span>
                      </a>
                    )}
                    {isTop && (
                      <span className="text-[10px] font-mono text-crimson-glow animate-pulse flex items-center gap-1">
                        [ CLICK DECK TO FLIP ]
                      </span>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deck Navigation Controls */}
        <div className="mt-16 flex items-center justify-between max-w-3xl mx-auto border-t border-white/10 pt-6">
          <button
            onClick={handlePrev}
            className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-crimson-glow" />
            <span>PREVIOUS CARD</span>
          </button>

          <div className="text-xs font-mono text-crimson-glow flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STACKED DECK: CARD {activeIndex + 1} OF {teamMembers.length}</span>
          </div>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-full bg-crimson hover:bg-crimson-glow text-black font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <span>NEXT CARD</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
