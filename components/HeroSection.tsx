"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onRegisterClick: () => void;
}

export default function HeroSection({ onRegisterClick }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Set slow-motion playback rate on background glowing video
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
        ctx.fillStyle = "rgba(0, 240, 255, 0.9)";
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
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.45 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.9;
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
    <section className="relative w-full h-screen min-h-[750px] flex items-center justify-center overflow-hidden bg-ink bg-white-checked">
      {/* Glowing Video Background Loop */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-90 z-0 pointer-events-none"
      >
        <source src="/glowing video.mp4" type="video/mp4" />
        <source src="/hero/glowing-video.mp4" type="video/mp4" />
      </video>

      {/* Top Header Shield Gradient */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-ink via-ink/60 to-transparent z-10 pointer-events-none" />

      {/* Canvas Circuit Particle Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none opacity-85"
      />

      {/* Interactive Clickable Hotspots overlay matching video's native buttons */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center flex flex-col items-center justify-center pt-64 sm:pt-72">
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-16 sm:mt-24">
          {/* Hotspot over CLAIM ACCESS PASS */}
          <button
            onClick={onRegisterClick}
            aria-label="Claim Access Pass"
            className="w-56 sm:w-60 h-14 rounded-full cursor-pointer bg-white/0 hover:bg-neonblue/20 border border-transparent hover:border-neonblue/60 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]"
          />

          {/* Hotspot over EXPLORE TRACKS */}
          <a
            href="#tracks"
            aria-label="Explore Tracks"
            className="w-56 sm:w-60 h-14 rounded-full cursor-pointer bg-white/0 hover:bg-white/10 border border-transparent hover:border-white/40 transition-all duration-300"
          />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-gray-300 hover:text-neonblue transition-colors cursor-pointer"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase mb-1">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-neonblue" />
        </motion.div>
      </motion.a>
    </section>
  );
}
