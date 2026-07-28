"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { schedule } from "@/data/event";
import { Clock, Calendar } from "lucide-react";

export default function ScheduleSection() {
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  return (
    <section id="schedule" className="py-24 relative bg-ink border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-crimson-glow">
            [ 03 // RUN OF SHOW ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold mt-2 mb-4">
            EVENT <span className="metal-gradient">SCHEDULE</span>
          </h2>
          <p className="text-gray-400 font-sans">
            48 intensive hours of hacking, workshops, mentoring, and live pitch showcases.
          </p>
        </motion.div>

        {/* Day Selector Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {schedule.map((dayData, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDayIdx(idx)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full font-display text-sm font-semibold transition-all duration-300 ${
                activeDayIdx === idx
                  ? "bg-crimson text-white shadow-[0_0_20px_rgba(200,16,46,0.6)]"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{dayData.day}</span>
              <span className="text-xs opacity-75 font-mono">({dayData.date})</span>
            </button>
          ))}
        </div>

        {/* Vertical Timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDayIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="relative border-l-2 border-crimson/40 ml-4 sm:ml-32 space-y-8 py-4"
          >
            {schedule[activeDayIdx].items.map((item, itemIdx) => (
              <motion.div
                key={itemIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: itemIdx * 0.1 }}
                className="relative pl-8 group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-ink border-2 border-crimson group-hover:bg-crimson-glow group-hover:scale-125 transition-all shadow-[0_0_10px_rgba(255,30,60,0.8)]" />

                {/* Time Badge (Desktop Left) */}
                <div className="sm:absolute sm:-left-36 sm:top-1 font-mono text-xs font-bold text-crimson-glow flex items-center gap-1.5 mb-2 sm:mb-0">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.time}</span>
                </div>

                {/* Event Details Card */}
                <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-crimson/40 transition-all">
                  <h4 className="text-lg font-display font-semibold text-white mb-1 group-hover:text-crimson-glow transition-colors">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-sm text-gray-400 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
