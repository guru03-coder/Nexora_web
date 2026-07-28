"use client";

import React, { useState, useEffect } from "react";
import { event } from "@/data/event";

interface EventDetailsBarProps {
  onRegisterClick: () => void;
}

export default function EventDetailsBar({ onRegisterClick }: EventDetailsBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero section (~500px)
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-4xl transition-all duration-500 animate-fade-in">
      <div className="bg-ink/90 backdrop-blur-xl border border-crimson/30 rounded-2xl px-5 py-3 shadow-2xl shadow-crimson/20 flex flex-wrap items-center justify-between gap-4">
        
        {/* Event Quick Info */}
        <div className="flex items-center gap-6 font-mono text-xs text-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-crimson font-bold text-base">📍</span>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">VENUE</span>
              <span className="font-semibold">{event.city}, {event.venue}</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 border-l border-white/10 pl-6">
            <span className="text-crimson font-bold text-base">📅</span>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">DATES</span>
              <span className="font-semibold">{event.dateRange}, 2026</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-6">
            <span className="text-crimson font-bold text-base">🏆</span>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">PRIZES</span>
              <span className="font-semibold text-crimson-glow">$100,000+ CASH</span>
            </div>
          </div>
        </div>

        {/* Pill Register CTA */}
        <button
          onClick={onRegisterClick}
          className="px-5 py-2 rounded-full font-display text-xs font-bold uppercase tracking-wider text-white bg-crimson hover:bg-crimson-glow shadow-md shadow-crimson/30 hover:shadow-crimson/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
        >
          <span>REGISTER NOW</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

      </div>
    </div>
  );
}
