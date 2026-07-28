"use client";

import React, { useState, useEffect } from "react";
import { event } from "@/data/event";

interface NavbarProps {
  onRegisterClick: () => void;
}

export default function Navbar({ onRegisterClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-xl border-b border-crimson/20 py-3 shadow-2xl shadow-crimson/5"
          : "bg-gradient-to-b from-ink/80 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded border border-crimson/50 bg-crimson/10 flex items-center justify-center font-display font-bold text-crimson group-hover:border-crimson group-hover:scale-105 transition-all">
            H
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] tracking-widest text-gray-400 font-mono uppercase">
              {event.presentedBy} PRESENTS
            </span>
            <span className="font-display text-2xl font-black tracking-widest metal-gradient">
              {event.name}
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-300">
          <a
            href="#about"
            className="hover:text-crimson-glow transition-colors tracking-wide hover:scale-105 transform"
          >
            ABOUT
          </a>
          <a
            href="#tracks"
            className="hover:text-crimson-glow transition-colors tracking-wide hover:scale-105 transform"
          >
            TRACKS
          </a>
          <a
            href="#schedule"
            className="hover:text-crimson-glow transition-colors tracking-wide hover:scale-105 transform"
          >
            SCHEDULE
          </a>
          <a
            href="#sponsors"
            className="hover:text-crimson-glow transition-colors tracking-wide hover:scale-105 transform"
          >
            SPONSORS
          </a>
          <a
            href="#faq"
            className="hover:text-crimson-glow transition-colors tracking-wide hover:scale-105 transform"
          >
            FAQ
          </a>
        </nav>

        {/* Register CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onRegisterClick}
            className="relative group overflow-hidden rounded-full px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white bg-crimson hover:bg-crimson-glow transition-all duration-300 shadow-lg shadow-crimson/30 hover:shadow-crimson/60 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>REGISTER NOW</span>
              <svg
                className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white p-2"
          aria-label="Toggle Navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ink/95 backdrop-blur-2xl border-b border-crimson/20 px-4 pt-4 pb-6 space-y-4 font-mono text-sm">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-300 hover:text-crimson-glow"
          >
            // ABOUT
          </a>
          <a
            href="#tracks"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-300 hover:text-crimson-glow"
          >
            // TRACKS
          </a>
          <a
            href="#schedule"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-300 hover:text-crimson-glow"
          >
            // SCHEDULE
          </a>
          <a
            href="#sponsors"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-300 hover:text-crimson-glow"
          >
            // SPONSORS
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gray-300 hover:text-crimson-glow"
          >
            // FAQ
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onRegisterClick();
            }}
            className="w-full mt-2 py-3 rounded-lg bg-crimson font-display text-xs font-bold tracking-widest text-white shadow-lg shadow-crimson/30"
          >
            REGISTER NOW
          </button>
        </div>
      )}
    </header>
  );
}
