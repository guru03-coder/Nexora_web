"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { teamMembers, TeamMember } from "@/data/event";
import { Linkedin, Users } from "lucide-react";

export default function MobileTeamSection() {
  return (
    <section id="team" className="py-16 px-4 bg-ink relative z-10 border-t border-cyan-500/20">
      <div className="max-w-md mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-widest">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>ORGANIZING TEAM</span>
          </div>
          <h2 className="text-2xl font-display font-extrabold text-white">
            MEET THE <span className="text-cyan-400">ORGANIZERS</span>
          </h2>
          <p className="text-xs text-gray-300">
            The core leads engineering NEXORA 2026.
          </p>
        </div>

        {/* 4 Vertical Cards Stacked Vertically for Mobile */}
        <div className="space-y-6">
          {teamMembers.map((member: TeamMember, idx: number) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-5 rounded-3xl bg-gradient-to-b from-cyan-950/80 to-ink border border-cyan-500/40 space-y-4 relative overflow-hidden backdrop-blur-sm shadow-[0_0_20px_rgba(0,229,255,0.15)]"
            >
              {/* Vertical Photo Frame */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-cyan-400/60 bg-black/60 flex items-center justify-center p-3 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-contain p-2"
                />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink to-transparent" />
              </div>

              {/* Name & Designation */}
              <div className="space-y-1 text-center">
                <h3 className="text-xl font-display font-extrabold text-white">
                  {member.name}
                </h3>
                <p className="text-xs font-mono font-bold text-cyan-400 tracking-wide uppercase">
                  {member.role}
                </p>
              </div>

              {/* LinkedIn Button */}
              {member.linkedin && (
                <div className="pt-2 border-t border-cyan-500/20">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
