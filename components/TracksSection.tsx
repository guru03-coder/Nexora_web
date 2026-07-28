"use client";

import { motion } from "framer-motion";
import { tracks } from "@/data/event";
import { Bot, ShieldCheck, Link as LinkIcon, Settings, Sparkles, Award } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  bot: Bot,
  shield: ShieldCheck,
  link: LinkIcon,
  settings: Settings,
  sparkles: Sparkles,
};

export default function TracksSection() {
  return (
    <section id="tracks" className="py-24 relative bg-ink/90 border-t border-white/5">
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
            [ 02 // CHALLENGE DOMAINS ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold mt-2 mb-4">
            HACKATHON <span className="metal-gradient">DOMAINS</span>
          </h2>
          <p className="text-gray-400 font-sans text-base sm:text-lg">
            Choose your frontier. Shape the future.
          </p>
        </motion.div>

        {/* Domains 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track, idx) => {
            const IconComponent = iconMap[track.icon] || Sparkles;
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative glass-panel rounded-2xl p-6 hover:border-crimson hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Domain Badge & Prize */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-crimson/10 border border-crimson/30 flex items-center justify-center text-crimson-glow group-hover:scale-110 group-hover:bg-crimson group-hover:text-black transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-crimson-glow bg-crimson/10 px-2.5 py-1 rounded-full border border-crimson/30">
                      <Award className="w-3.5 h-3.5" />
                      <span>{track.prize}</span>
                    </div>
                  </div>

                  {/* Domain Title */}
                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-crimson-glow transition-colors">
                    {track.title}
                  </h3>

                  {/* Domain Description */}
                  <p className="text-sm text-gray-400 leading-relaxed font-sans mb-6">
                    {track.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400 group-hover:text-white transition-colors">
                  <span>Domain ID: #{track.id}</span>
                  <span className="group-hover:translate-x-1 transition-transform text-crimson-glow font-bold">
                    Learn More →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
