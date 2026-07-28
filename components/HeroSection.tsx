"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { event } from "@/data/event";

interface HeroSectionProps {
  onRegisterClick: () => void;
}

export default function HeroSection({ onRegisterClick }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Set slow-motion playback rate on hero video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.45;
    }
  }, []);

  // Ambient Canvas Circuit-Line Particle Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes for circuit network
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw circuit lines between close particles
      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 30, 60, 0.6)";
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(200, 16, 46, ${0.35 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-ink">
      {/* Background Video Loop */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 pointer-events-none"
      >
        <source src="/hero/nexora-loop.mp4" type="video/mp4" />
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70 z-0 pointer-events-none" />

      {/* Canvas Circuit Particle Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none opacity-80"
      />

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center flex flex-col items-center justify-center pt-16">
        
        {/* Presented By Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-crimson/30 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-crimson-glow animate-ping" />
          <span className="text-xs font-mono tracking-widest text-gray-300 uppercase">
            {event.presentedBy} PRESENTS
          </span>
        </motion.div>

        {/* Wordmark Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl sm:text-8xl md:text-9xl font-display font-black tracking-tight metal-gradient text-glow mb-4"
        >
          {event.name}
        </motion.h1>

        {/* Tagline in Italic Serif */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-2xl sm:text-4xl font-serif italic text-gray-200 tracking-wide max-w-2xl mb-10"
        >
          &ldquo;{event.tagline}&rdquo;
        </motion.p>

        {/* Hero CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={onRegisterClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-crimson to-crimson-dark text-white font-display text-sm font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(255,30,60,0.6)] hover:shadow-[0_0_45px_rgba(255,30,60,0.9)] hover:scale-105 transition-all duration-300"
          >
            Claim Access Pass
          </button>
          
          <a
            href="#tracks"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/20 hover:border-crimson/50 text-white font-display text-sm font-semibold uppercase tracking-widest backdrop-blur-md hover:bg-white/10 transition-all duration-300"
          >
            Explore Tracks
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-gray-400 hover:text-crimson-glow transition-colors"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase mb-1">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
