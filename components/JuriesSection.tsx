"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { juries, JuryMember } from "@/data/event";
import { Linkedin } from "lucide-react";

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
            [ 05 // EXPERT PANEL & HONORARY GUESTS ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold mt-2 mb-4">
            JURIES & <span className="metal-gradient">CHIEF GUESTS</span>
          </h2>
          <p className="text-gray-400 font-sans text-base sm:text-lg">
            Distinguished industry leaders, veteran engineering mentors, and visionary chief guests guiding NEXORA 2026.
          </p>
        </motion.div>

        {/* Flashcard Line-by-Line 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {juries.map((person: JuryMember, idx: number) => {
            return (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="glass-panel rounded-2xl border border-white/10 hover:border-[#00E5FF] hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
              >
                {/* Cyber Flashcard Header / Corner Accents */}
                <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-[#00E5FF]/40 text-[10px] font-mono text-[#00E5FF] tracking-wider uppercase">
                  CARD 0{idx + 1}
                </div>

                {/* Flashcard Image Frame */}
                <div className="relative w-full h-72 sm:h-80 bg-black/60 overflow-hidden flex items-center justify-center p-3">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
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
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-xs font-mono text-[#00E5FF] mt-1 font-semibold">
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
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                        // OFFICIAL PANEL
                      </span>
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#00E5FF] transition-colors p-1.5 rounded-lg bg-white/5 hover:bg-white/10"
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
