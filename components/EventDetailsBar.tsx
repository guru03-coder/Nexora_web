"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, QrCode } from "lucide-react";
import { event } from "@/data/event";

interface EventDetailsBarProps {
  onRegisterClick: () => void;
}

export default function EventDetailsBar({ onRegisterClick }: EventDetailsBarProps) {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once scrolled past 400px
      setShowBar(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showBar && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-3xl glass-panel rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-neonblue/40"
        >
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-gray-200">
            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-neonblue shrink-0" />
              <span>
                <strong className="text-white font-sans">{event.city}</strong> • {event.venue}
              </span>
            </div>

            {/* Dates */}
            <div className="hidden sm:flex items-center gap-2 border-x border-white/10 px-4">
              <Calendar className="w-4 h-4 text-neonblue shrink-0" />
              <span className="text-white font-sans font-semibold">{event.dateRange}</span>
            </div>

            {/* Pill Register Button */}
            <button
              onClick={onRegisterClick}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neonblue hover:bg-[#00D2FF] text-black font-display text-xs font-extrabold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.6)]"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Register Now</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
