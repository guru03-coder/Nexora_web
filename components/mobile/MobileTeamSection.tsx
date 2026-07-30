"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { teamMembers, TeamMember } from "@/data/event";
import { Linkedin, Users, ChevronDown, Sparkles, RefreshCw } from "lucide-react";

export default function MobileTeamSection() {
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
    <section id="team" className="py-16 px-4 bg-ink relative z-10 border-t border-cyan-500/20">
      <div className="max-w-md mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-widest">
            <Users className="w-3 h-3 text-cyan-400" />
            <span>ORGANIZING TEAM</span>
          </div>
          <h2 className="text-2xl font-display font-extrabold text-white">
            MEET THE <span className="text-cyan-400">ORGANIZERS</span>
          </h2>
          <p className="text-xs text-gray-300">
            Click the button or cards below to reveal each team member line by line.
          </p>

          {/* Reveal Controls */}
          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={handleRevealNext}
              disabled={revealedCount >= teamMembers.length}
              className={`w-full py-3 rounded-xl font-display text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                revealedCount < teamMembers.length
                  ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,229,255,0.6)] active:scale-95 cursor-pointer"
                  : "bg-white/10 text-gray-500 border border-white/10"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {revealedCount < teamMembers.length
                  ? `TAP TO REVEAL NEXT (${revealedCount}/${teamMembers.length})`
                  : "ALL 4 MEMBERS REVEALED"}
              </span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>

            <button
              onClick={handleToggleAll}
              className="py-2 text-[11px] font-mono text-cyan-400 flex items-center justify-center gap-1.5 opacity-80"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{revealedCount === teamMembers.length ? "Reset to 1 Member" : "Show All 4 Members"}</span>
            </button>
          </div>
        </div>

        {/* 4 Line-by-Line Stacked Flashcards */}
        <div className="space-y-4">
          <AnimatePresence>
            {teamMembers.slice(0, revealedCount).map((member: TeamMember, idx: number) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={handleRevealNext}
                className="p-5 rounded-2xl bg-white/5 border border-cyan-500/40 space-y-3 relative overflow-hidden backdrop-blur-sm shadow-[0_0_20px_rgba(0,229,255,0.15)] active:scale-98 transition-transform"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-400">
                    CARD 0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-cyan-300">
                    {member.role}
                  </span>
                </div>

                {/* Identity Frame */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-cyan-400/60 shrink-0 bg-black/60 p-1">
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
                <p className="text-xs text-gray-300 leading-relaxed font-sans pt-1">
                  {member.bio}
                </p>

                {/* LinkedIn Action */}
                {member.linkedin && (
                  <div className="pt-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full py-2.5 rounded-xl bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>Connect on LinkedIn</span>
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
