"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { teamMembers, TeamMember } from "@/data/event";
import { Linkedin, Layers, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

export default function MobileTeamSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  return (
    <section id="team" className="py-16 px-4 bg-ink relative z-10 border-t border-cyan-500/20">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>STACKED DECK OF CARDS</span>
          </div>
          <h2 className="text-2xl font-display font-extrabold text-white">
            MEET THE <span className="text-cyan-400">ORGANIZERS</span>
          </h2>
          <p className="text-xs text-gray-300">
            Tap cards to flip through team members stacked in deck behind each other.
          </p>

          {/* Quick Pill Selector */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {teamMembers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-8 bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                    : "w-2 bg-white/20"
                }`}
                aria-label={`Jump to Card ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stacked Deck Container */}
        <div className="relative h-[290px] w-full my-4 flex items-center justify-center">
          {teamMembers.map((member: TeamMember, idx: number) => {
            const stackPosition = (idx - activeIndex + teamMembers.length) % teamMembers.length;
            const isTop = stackPosition === 0;

            const offsetY = stackPosition * 12; // Stack spacing
            const scale = 1 - stackPosition * 0.05;
            const zIndex = teamMembers.length - stackPosition;
            const opacity = 1 - stackPosition * 0.2;

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
                  duration: 0.35,
                  ease: "easeInOut",
                }}
                onClick={handleNext}
                className={`absolute inset-x-0 mx-auto p-4 rounded-2xl bg-gradient-to-b from-cyan-950/90 to-ink border border-cyan-500/40 space-y-3 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${
                  isTop ? "border-cyan-400 shadow-[0_0_25px_rgba(0,229,255,0.3)]" : ""
                }`}
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-400/20 border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300">
                    CARD 0{idx + 1} / 04 DECK
                  </span>
                  <span className="text-[11px] font-mono font-bold text-cyan-400 truncate max-w-[150px]">
                    {member.role}
                  </span>
                </div>

                {/* Identity */}
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-cyan-400/60 shrink-0 bg-black/60 p-1">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="text-base font-display font-extrabold text-white truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-gray-400">
                      {member.company}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-[11px] text-gray-300 leading-relaxed font-sans line-clamp-2">
                  {member.bio}
                </p>

                {/* Action Link & Tap Prompt */}
                <div className="flex items-center justify-between pt-1">
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 rounded-lg bg-cyan-400/20 hover:bg-cyan-400 hover:text-black border border-cyan-500/40 text-cyan-300 font-display text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all"
                    >
                      <Linkedin className="w-3 h-3" />
                      <span>LinkedIn</span>
                    </a>
                  ) : <div />}

                  {isTop && (
                    <span className="text-[9px] font-mono text-cyan-400 animate-pulse">
                      [ TAP CARD TO FLIP ]
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deck Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-cyan-500/20">
          <button
            onClick={handlePrev}
            className="px-3.5 py-2 rounded-xl bg-white/5 border border-cyan-500/30 text-gray-300 text-xs font-mono flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4 text-cyan-400" />
            <span>PREV</span>
          </button>

          <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>CARD {activeIndex + 1} OF {teamMembers.length}</span>
          </span>

          <button
            onClick={handleNext}
            className="px-3.5 py-2 rounded-xl bg-cyan-400 text-black text-xs font-display font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-[0_0_15px_rgba(0,229,255,0.6)]"
          >
            <span>NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
