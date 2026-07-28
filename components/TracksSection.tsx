"use client";

import React from "react";
import { motion } from "framer-motion";
import { tracks } from "@/data/event";
import { Brain, Link as LinkIcon, Leaf, Sparkles } from "lucide-react";

export default function TracksSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "brain":
        return <Brain className="w-7 h-7 text-crimson-glow" />;
      case "link":
        return <LinkIcon className="w-7 h-7 text-crimson-glow" />;
      case "leaf":
        return <Leaf className="w-7 h-7 text-crimson-glow" />;
      case "spark":
      default:
        return <Sparkles className="w-7 h-7 text-crimson-glow" />;
    }
  };

  return (
    <section id="tracks" className="relative py-28 bg-ink/95 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-crimson/10 border border-crimson/30 font-mono text-xs text-crimson-glow uppercase tracking-widest"
          >
            [ 02 // DOMAIN TRACKS ]
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white"
          >
            CHOOSE YOUR <span className="metal-gradient">CHALLENGE</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-sans text-base sm:text-lg"
          >
            Compete across four main frontier tracks. Tackle real-world problems and claim your share of the $100k+ prize pool.
          </motion.p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-crimson/60 transition-all duration-500 p-8 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-crimson/20"
            >
              {/* Subtle Card Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-crimson/10 rounded-full blur-3xl group-hover:bg-crimson/25 transition-all duration-500" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-crimson/10 border border-crimson/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {getIcon(track.icon)}
                  </div>
                  {track.prize && (
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-crimson/20 border border-crimson/40 text-crimson-glow">
                      {track.prize}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold text-white group-hover:text-crimson-glow transition-colors uppercase tracking-wider mb-3">
                  {track.title}
                </h3>

                <p className="text-gray-300 font-sans text-sm leading-relaxed mb-6">
                  {track.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>TRACK // 0{index + 1}</span>
                <span className="group-hover:translate-x-1 group-hover:text-white transition-all flex items-center gap-1">
                  VIEW SPECS &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
