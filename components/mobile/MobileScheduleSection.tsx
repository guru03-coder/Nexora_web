"use client";

import { motion } from "framer-motion";
import { phases } from "@/data/event";
import { Clock, Rocket, Lightbulb, Code2, Trophy } from "lucide-react";

const phaseIcons = [Rocket, Lightbulb, Code2, Trophy];

export default function MobileScheduleSection() {
  return (
    <section id="schedule" className="py-16 px-4 bg-ink relative z-10 border-t border-cyan-500/20">
      <div className="max-w-md mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-widest">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>EVENT TIMELINE</span>
          </div>
          <h2 className="text-2xl font-display font-extrabold text-white">
            EVENT <span className="text-cyan-400">PHASES</span>
          </h2>
          <p className="text-xs text-gray-300">
            From online abstract submission to 24-hour physical build & live pitch.
          </p>
        </div>

        {/* 4 Phase Cards */}
        <div className="space-y-4">
          {phases.map((item, idx) => {
            const Icon = phaseIcons[idx] || Rocket;
            return (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-white/5 border border-cyan-500/30 space-y-3 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/90 px-2.5 py-1 rounded-full border border-cyan-400/40 uppercase tracking-widest">
                    {item.phase}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">
                    {item.date}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-400/40 text-cyan-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-display font-bold text-white">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
