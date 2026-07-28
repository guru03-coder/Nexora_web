"use client";

import React from "react";
import { motion } from "framer-motion";
import { event } from "@/data/event";

interface HeroSectionProps {
  onRegisterClick: () => void;
}

export default function HeroSection({ onRegisterClick }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Hero Video Loop */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-75 contrast-125 opacity-80"
        >
          <source src="/hero/nexora-loop.mp4" type="video/mp4" />
          <source src="/hero/video.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Vignette & Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-crimson/10 via-transparent to-ink/90 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center justify-center space-y-8">
        
        {/* Presented By Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-crimson/40 bg-ink/70 backdrop-blur-md shadow-lg shadow-crimson/10"
        >
          <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
          <span className="text-xs font-mono tracking-widest text-gray-300 uppercase">
            {event.presentedBy} PRESENTS
          </span>
        </motion.div>

        {/* Wordmark Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative"
        >
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase metal-gradient leading-none drop-shadow-2xl">
            {event.name}
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 sm:w-80 h-1 bg-gradient-to-r from-transparent via-crimson to-transparent blur-sm" />
        </motion.div>

        {/* Tagline: Elegant Italic Serif */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="font-serif italic text-2xl sm:text-4xl text-gray-200 tracking-wide font-light max-w-2xl text-glow-white"
        >
          &ldquo;{event.tagline}&rdquo;
        </motion.p>

        {/* Event Quick Meta Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-300 pt-2"
        >
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2">
            <span className="text-crimson">📍</span>
            <span>{event.city}, {event.venue}</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-2">
            <span className="text-crimson">📅</span>
            <span>{event.dateRange}, 2026</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-crimson/20 border border-crimson/40 text-crimson-glow font-bold backdrop-blur-md">
            ⚡ $100K+ PRIZE POOL
          </div>
        </motion.div>

        {/* Hero CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6"
        >
          <button
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-display text-sm font-bold tracking-widest text-white bg-crimson hover:bg-crimson-glow shadow-xl shadow-crimson/40 hover:shadow-crimson/70 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 uppercase"
          >
            <span>REGISTER NOW</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          <a
            href="#tracks"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-display text-sm font-bold tracking-widest text-gray-200 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-crimson/50 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 uppercase"
          >
            EXPLORE TRACKS
          </a>
        </motion.div>

      </div>

      {/* Scroll Down Chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 text-gray-400 font-mono text-[10px] tracking-widest pointer-events-none"
      >
        <span>SCROLL TO EXPLORE</span>
        <div className="w-5 h-8 rounded-full border border-gray-500/50 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-crimson"
          />
        </div>
      </motion.div>
    </section>
  );
}
