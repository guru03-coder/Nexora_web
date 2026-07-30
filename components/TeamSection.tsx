"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { teamMembers, TeamMember } from "@/data/event";
import { Linkedin, Users } from "lucide-react";

export default function TeamSection() {
  return (
    <section id="team" className="py-24 relative bg-ink border-t border-white/5 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-crimson/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-crimson-glow flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-crimson-glow" />
            <span>[ 06 // CORE ORGANIZING TEAM ]</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold mt-2 mb-4">
            ORGANIZING <span className="metal-gradient">TEAM</span>
          </h2>
          <p className="text-gray-400 font-sans text-base sm:text-lg">
            The visionary leads and operational orchestrators driving NEXORA 2026.
          </p>
        </motion.div>

        {/* 4 Vertical Rectangle Cards Side-by-Side Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {teamMembers.map((member: TeamMember, idx: number) => {
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-panel rounded-3xl p-6 border border-white/15 hover:border-crimson hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
              >
                {/* Glowing Top Accent Bar */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-crimson to-crimson-dark group-hover:h-2 transition-all duration-300" />

                {/* Top Position Tag */}
                <div className="mb-4">
                  <span className="px-3 py-1 rounded-full bg-crimson/20 border border-crimson/40 text-crimson-glow text-[10px] font-mono font-bold tracking-widest uppercase inline-block">
                    {member.role}
                  </span>
                </div>

                {/* Vertical Portrait Photo Frame */}
                <div className="relative w-full h-52 sm:h-56 bg-black/60 rounded-2xl overflow-hidden border border-crimson/40 mb-4 flex items-center justify-center p-3 group-hover:border-crimson transition-colors shadow-[0_0_20px_rgba(0,229,255,0.15)]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ink to-transparent pointer-events-none" />
                </div>

                {/* Card Details */}
                <div className="flex flex-col flex-grow justify-between space-y-3">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-crimson-glow transition-colors">
                      {member.name}
                    </h3>

                    <p className="text-xs font-mono text-gray-400 mt-1">
                      ORGANIZATION: <span className="text-white font-semibold">{member.company}</span>
                    </p>

                    <p className="text-xs text-gray-300 font-sans leading-relaxed mt-2 line-clamp-3">
                      {member.bio}
                    </p>
                  </div>

                  {/* LinkedIn Action Link */}
                  {member.linkedin && (
                    <div className="pt-4 border-t border-white/10 mt-auto">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-crimson/20 border border-white/15 hover:border-crimson/60 text-gray-300 hover:text-crimson-glow font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                      >
                        <Linkedin className="w-4 h-4 text-crimson-glow" />
                        <span>CONNECT ON LINKEDIN</span>
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
