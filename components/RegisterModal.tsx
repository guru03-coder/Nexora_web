"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { event } from "@/data/event";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    track: "ai-ml",
    github: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-ink/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg rounded-3xl bg-ink/95 border border-crimson/50 p-6 sm:p-8 shadow-2xl shadow-crimson/30 z-10 text-left overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="mb-6 space-y-1">
                <span className="font-mono text-xs text-crimson-glow uppercase tracking-widest">
                  [ HACKATHON PASS ]
                </span>
                <h3 className="font-display text-2xl font-black text-white uppercase">
                  REGISTER FOR <span className="metal-gradient">{event.name}</span>
                </h3>
                <p className="text-xs text-gray-400 font-sans">
                  {event.city} • {event.dateRange}, 2026
                </p>
              </div>

              {/* QR Code Section */}
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 mb-6">
                <div className="relative w-16 h-16 bg-white rounded-xl p-1 overflow-hidden shrink-0">
                  <Image
                    src="/qr/nexora-qr.png"
                    alt="QR Code"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xs text-gray-300 font-mono">
                  <span className="text-white font-bold block">FAST-PASS QR CODE</span>
                  <span>Scan or complete the quick form below.</span>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block text-gray-300 font-mono uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-crimson"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-mono uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-crimson"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-mono uppercase mb-1">Primary Track</label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-ink border border-white/10 text-white focus:outline-none focus:border-crimson"
                  >
                    <option value="ai-ml">AI / ML & Autonomous Agents</option>
                    <option value="web3">Web3 & Blockchain Vault</option>
                    <option value="sustain">Sustainability & GreenTech</option>
                    <option value="open">Open Innovation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-mono uppercase mb-1">GitHub / Portfolio URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-crimson"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 mt-2 rounded-xl font-display text-xs font-bold uppercase tracking-widest text-white bg-crimson hover:bg-crimson-glow shadow-lg shadow-crimson/40 transition-all duration-300"
                >
                  INITIALIZE ACCESS TOKEN
                </button>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-crimson-glow mx-auto animate-bounce" />
              <h3 className="font-display text-2xl font-black text-white uppercase">ACCESS GRANTED</h3>
              <p className="text-sm text-gray-300 font-sans">
                Your NEXORA hacker access token has been generated. Check your inbox for confirmation details and Discord invite.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider"
              >
                CLOSE WINDOW
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
