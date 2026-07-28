"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleFinish = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 500); // smooth fade duration
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          onClick={handleFinish}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink overflow-hidden cursor-pointer"
        >
          <video
            autoPlay
            muted
            playsInline
            onEnded={handleFinish}
            className="w-full h-full object-cover"
          >
            <source src="/transition video.mp4" type="video/mp4" />
          </video>

          <div className="absolute bottom-8 right-8 text-xs font-mono text-white/50 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest pointer-events-none">
            Click or press Space to skip
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
