"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroLoaderProps {
  onComplete: () => void;
}

const statusMessages = [
  { threshold: 0, text: "INITIALIZING NEXORA CORE..." },
  { threshold: 25, text: "LOADING NEURAL DOMAINS & COMPUTE NODES..." },
  { threshold: 55, text: "CONNECTING TO SNS IHUB COIMBATORE..." },
  { threshold: 85, text: "SYNCHRONIZING 24H SPRINT MATRIX..." },
  { threshold: 100, text: "SYSTEM ONLINE. WELCOME TO NEXORA." },
];

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleFinish = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 500); // smooth fade transition
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(handleFinish, 300);
          return 100;
        }
        // Smooth logarithmic increment
        const diff = 100 - prev;
        const inc = Math.max(1, Math.floor(Math.random() * 8) + 2);
        return Math.min(100, prev + inc);
      });
    }, 80);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        clearInterval(interval);
        setProgress(100);
        handleFinish();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Determine current status message
  const currentStatus =
    [...statusMessages].reverse().find((m) => progress >= m.threshold)?.text ||
    "INITIALIZING...";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.5, ease: "easeInOut" } }}
          onClick={handleFinish}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden cursor-pointer select-none"
        >
          {/* Cyberpunk Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00e5ff0a_1px,transparent_1px),linear-gradient(to_bottom,#00e5ff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Central Glow Orb */}
          <div className="absolute w-[500px] h-[500px] bg-[#00E5FF]/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Main Animated Loader Window */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative max-w-lg w-[90%] md:w-full p-8 md:p-10 bg-black/90 backdrop-blur-xl border border-[#00E5FF]/30 shadow-[0_0_60px_rgba(0,229,255,0.2)] rounded-sm"
          >
            {/* Corner Brackets */}
            <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-2 border-l-2 border-[#00E5FF]" />
            <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-2 border-r-2 border-[#00E5FF]" />
            <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-2 border-l-2 border-[#00E5FF]" />
            <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-2 border-r-2 border-[#00E5FF]" />

            {/* Top Pill Badge */}
            <div className="inline-block bg-[#00E5FF] text-black font-mono font-black text-xs tracking-widest px-3 py-1 uppercase shadow-[3px_3px_0px_#C8102E] mb-6">
              HACKHERE.INIT
            </div>

            {/* Title Display */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-6xl font-display font-black tracking-wider text-white uppercase flex items-center gap-3">
                <span className="text-[#00E5FF] drop-shadow-[0_0_25px_rgba(0,229,255,0.8)]">
                  NEXORA
                </span>
                <span className="text-xs font-mono font-normal text-gray-500 tracking-normal border border-white/10 px-2 py-0.5 rounded">
                  2026
                </span>
              </h1>
            </div>

            {/* Status Log & Percentage */}
            <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-3 tracking-wider">
              <span className="truncate pr-2">{currentStatus}</span>
              <span className="text-[#00E5FF] font-bold text-sm font-mono">
                {progress}%
              </span>
            </div>

            {/* Glowing Progress Bar */}
            <div className="w-full h-3 bg-gray-950 rounded-sm border border-[#00E5FF]/40 p-[2px] overflow-hidden mb-8 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#00E5FF] via-[#00E5FF] to-white shadow-[0_0_15px_#00E5FF] rounded-sm transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Footer Metadata */}
            <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 border-t border-white/10 pt-4">
              <span>[ HACKHERE PRESENTS ]</span>
              <span>v1.0.0</span>
            </div>
          </motion.div>

          {/* User Skip Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xs font-mono text-gray-500 uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md hover:border-[#00E5FF]/40 transition-colors"
          >
            Click anywhere or press Space to skip
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
