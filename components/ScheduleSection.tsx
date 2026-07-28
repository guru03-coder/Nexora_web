"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { schedule } from "@/data/event";

export default function ScheduleSection() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="schedule" className="relative py-28 bg-ink border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-crimson/10 border border-crimson/30 font-mono text-xs text-crimson-glow uppercase tracking-widest"
          >
            [ 03 // RUN OF SHOW ]
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white"
          >
            HACKATHON <span className="metal-gradient">TIMELINE</span>
          </motion.h2>

          <p className="text-gray-400 font-sans text-sm sm:text-base">
            48 continuous hours of innovation, workshops, keynotes, and prizes.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {schedule.map((dayData, idx) => (
            <button
              key={dayData.day}
              onClick={() => setActiveDay(idx)}
              className={`px-8 py-3.5 rounded-xl font-display text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                activeDay === idx
                  ? "bg-crimson text-white border-crimson shadow-lg shadow-crimson/30"
                  : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {dayData.day} — {dayData.date}
            </button>
          ))}
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-crimson/30 ml-4 sm:ml-32 space-y-8 pl-6 sm:pl-10">
          {schedule[activeDay].items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-ink border-2 border-crimson group-hover:border-crimson-glow group-hover:scale-125 transition-transform" />

              {/* Time Label (Desktop Absolute Left) */}
              <div className="sm:absolute sm:-left-36 sm:top-1 font-mono text-xs font-bold text-crimson-glow uppercase mb-1 sm:mb-0">
                {item.time}
              </div>

              {/* Card Container */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-crimson/40 transition-colors backdrop-blur-sm">
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-300 font-sans text-sm leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
