"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { teamMembers, TeamMember } from "@/data/event";
import { Linkedin, Users, ChevronRight, ChevronLeft, Layers, Sparkles } from "lucide-react";

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const handleSelectCard = (index: number) => {
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
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-crimson-glow flex items-center justify-center gap-2">
            <Layers className="w-4 h-4 text-crimson-glow" />
            <span>[ 06 // CORE ORGANIZING TEAM ]</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold mt-2 mb-3">
            ORGANIZING <span className="metal-gradient">TEAM</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base mb-6">
            Click on the card deck to flip through the team members behind NEXORA 2026.
          </p>

          {/* Position Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {teamMembers.map((member: TeamMember, idx: number) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={member.id}
                  onClick={() => handleSelectCard(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-display font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-crimson text-black shadow-[0_0_20px_rgba(0,229,255,0.6)] scale-105"
                      : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? "bg-black animate-ping" : "bg-crimson-glow"}`} />
                  <span>{member.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Vertical Rectangle Stack of Cards Container */}
        <div className="relative h-[530px] sm:h-[550px] w-full max-w-sm mx-auto flex items-center justify-center my-6">
          {teamMembers.map((member: TeamMember, idx: number) => {
            // Stack position index (0 = top card)
            const stackPosition = (idx - activeIndex + teamMembers.length) % teamMembers.length;
            const isTop = stackPosition === 0;

            const offsetY = stackPosition * 16;
            const scale = 1 - stackPosition * 0.05;
            const zIndex = teamMembers.length - stackPosition;
            const opacity = 1 - stackPosition * 0.18;

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
                className={`absolute w-[310px] sm:w-[340px] h-[500px] sm:h-[520px] glass-panel rounded-3xl p-6 border border-white/15 hover:border-crimson/80 transition-all duration-300 cursor-pointer overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between ${
                  isTop
                    ? "shadow-[0_0_35px_rgba(0,229,255,0.25)] border-crimson/60"
                    : "pointer-events-auto"
                }`}
                style={{
                  transformOrigin: "top center",
                }}
              >
                {/* Glowing Top Accent */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-crimson to-crimson-dark" />

                {/* Top Role Badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mt-1">
                  <span className="px-3 py-1 rounded-full bg-crimson/20 border border-crimson/40 text-crimson-glow text-[11px] font-mono font-bold tracking-wider uppercase">
                    {member.role}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    // TEAM
                  </span>
                </div>

                {/* Vertical Portrait Photo Frame */}
                <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden border-2 border-crimson/40 bg-black/70 my-3 flex items-center justify-center p-3 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain p-2"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink to-transparent" />
                </div>

                {/* Info Content */}
                <div className="space-y-1.5 text-center my-auto">
                  <h3 className="text-2xl font-display font-extrabold text-white">
                    {member.name}
                  </h3>

                  <p className="text-xs font-mono text-crimson-glow">
                    ORGANIZATION: <span className="text-white font-semibold">{member.company}</span>
                  </p>

                  <p className="text-xs text-gray-300 font-sans leading-relaxed line-clamp-3 pt-1">
                    {member.bio}
                  </p>
                </div>

                {/* Bottom Social Link & Tap Prompt */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full py-2.5 rounded-full bg-white/5 hover:bg-crimson/20 border border-white/20 hover:border-crimson/60 text-white hover:text-crimson-glow font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                    >
                      <Linkedin className="w-4 h-4 text-crimson-glow" />
                      <span>CONNECT ON LINKEDIN</span>
                    </a>
                  ) : <div />}
                </div>

                {isTop && (
                  <div className="text-center pb-1">
                    <span className="text-[9px] font-mono text-crimson-glow animate-pulse">
                      [ CLICK CARD TO FLIP ]
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="mt-8 flex items-center justify-between max-w-sm mx-auto border-t border-white/10 pt-5">
          <button
            onClick={handlePrev}
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-crimson-glow" />
            <span>PREV</span>
          </button>

          <div className="text-xs font-mono text-crimson-glow flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>POSITION {activeIndex + 1} OF {teamMembers.length}</span>
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-full bg-crimson hover:bg-crimson-glow text-black font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <span>NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
