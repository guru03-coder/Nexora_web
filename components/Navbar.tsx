"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { event } from "@/data/event";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onRegisterClick: () => void;
}

export default function Navbar({ onRegisterClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Domains", href: "#tracks" },
    { name: "Schedule", href: "#schedule" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "Juries", href: "#juries" },
    { name: "FAQ", href: "#faq" },
  ];

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
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-crimson/40 bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Image
              src="/logo.jpeg"
              alt="Nexora Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-crimson-glow transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA Register Button & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-3">
          <a
            href={event.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-crimson text-black font-display text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] transition-all duration-300 inline-flex items-center justify-center"
          >
            <span className="relative z-10">Register Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-crimson-glow to-crimson opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-crimson-glow" />
            ) : (
              <Menu className="w-5 h-5 text-crimson-glow" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-ink/95 border-b border-crimson/30 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-5 pt-4 pb-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-display font-medium text-gray-200 hover:text-crimson-glow hover:bg-white/5 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
