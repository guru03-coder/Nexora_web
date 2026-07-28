"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { event } from "@/data/event";

interface NavbarProps {
  onRegisterClick: () => void;
}

export default function Navbar({ onRegisterClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-ink/90 backdrop-blur-xl border-b border-crimson/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] ${
        scrolled ? "py-3 bg-ink/95 border-crimson/50" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-lg bg-crimson/20 border border-crimson/40 flex items-center justify-center font-display font-black text-white text-xs group-hover:scale-105 transition-transform">
            H
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-crimson-glow animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-display font-extrabold tracking-wider metal-gradient">
              {event.name}
            </span>
            <span className="text-[10px] font-mono text-gray-400 -mt-1 tracking-widest uppercase">
              by {event.presentedBy}
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <a href="#about" className="hover:text-crimson-glow transition-colors">
            About
          </a>
          <a href="#tracks" className="hover:text-crimson-glow transition-colors">
            Tracks
          </a>
          <a href="#schedule" className="hover:text-crimson-glow transition-colors">
            Schedule
          </a>
          <a href="#sponsors" className="hover:text-crimson-glow transition-colors">
            Sponsors
          </a>
          <a href="#faq" className="hover:text-crimson-glow transition-colors">
            FAQ
          </a>
        </div>

        {/* CTA Register Button */}
        <button
          onClick={onRegisterClick}
          className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-crimson text-white font-display text-xs font-semibold uppercase tracking-wider shadow-[0_0_20px_rgba(200,16,46,0.5)] hover:shadow-[0_0_30px_rgba(255,30,60,0.8)] transition-all duration-300"
        >
          <span className="relative z-10">Register Now</span>
          <div className="absolute inset-0 bg-gradient-to-r from-crimson-glow to-crimson opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </motion.header>
  );
}
