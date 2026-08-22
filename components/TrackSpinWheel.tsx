"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Download, Shield, Sparkles, RotateCw, CheckCircle2, HeartPulse, Lock } from "lucide-react";

interface TrackSpinWheelProps {
  track: string;
  problemStatement: string;
  problemStatementFileUrl?: string;
  teamId: string;
}

function getSavedSpinState(tId: string): boolean {
  if (typeof window === "undefined") return false;
  const cleanId = (tId || "").toLowerCase().trim();
  const rawId = (tId || "").trim();
  const keys = [
    `nexora_track_spin_v2_${cleanId}`,
    `nexora_track_spin_v2_${rawId}`,
    `nexora_track_spin_${cleanId}`,
    `nexora_spin_done_${cleanId}`,
  ];
  return keys.some((k) => localStorage.getItem(k) === "true");
}

function saveSpinState(tId: string) {
  if (typeof window === "undefined") return;
  const cleanId = (tId || "").toLowerCase().trim();
  const rawId = (tId || "").trim();
  const keys = [
    `nexora_track_spin_v2_${cleanId}`,
    `nexora_track_spin_v2_${rawId}`,
    `nexora_track_spin_${cleanId}`,
    `nexora_spin_done_${cleanId}`,
  ];
  keys.forEach((k) => localStorage.setItem(k, "true"));
}

export default function TrackSpinWheel({
  track,
  problemStatement,
  problemStatementFileUrl,
  teamId,
}: TrackSpinWheelProps) {
  const [isRevealed, setIsRevealed] = useState<boolean>(() => getSavedSpinState(teamId));
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotationDegree, setRotationDegree] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(() => getSavedSpinState(teamId));

  useEffect(() => {
    if (getSavedSpinState(teamId)) {
      setIsRevealed(true);
      setShowResult(true);
    }
  }, [teamId]);

  // 8 segments alternating: 0=Cyber, 1=Med, 2=Cyber, 3=Med, 4=Cyber, 5=Med, 6=Cyber, 7=Med
  // Pointer is at TOP (0 deg / 360 deg).
  // Slice angle = 45 deg per slice.
  // Center of Slice 0 (Cyber Security): 22.5°
  // Center of Slice 1 (Med-Tech): 67.5°
  // To bring Slice under top pointer (0°): Wheel must rotate by (360 - sliceCenterAngle)
  const handleSpin = () => {
    if (isSpinning || isRevealed || showResult) return;

    setIsSpinning(true);
    setShowResult(false);

    const isCyber = track.toLowerCase().includes("cyber");
    // Target slice index:
    // Cyber slices: 0 (22.5°), 2 (112.5°), 4 (202.5°), 6 (292.5°)
    // Med-Tech slices: 1 (67.5°), 3 (157.5°), 5 (247.5°), 7 (337.5°)
    const targetSliceIndex = isCyber ? 0 : 1; 
    const sliceCenterAngle = targetSliceIndex * 45 + 22.5;

    // Additional 5 full rotations (1800 deg) for dramatic spin effect
    const totalRotation = 1800 + (360 - sliceCenterAngle);

    setRotationDegree(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setIsRevealed(true);
      setShowResult(true);
      saveSpinState(teamId);
    }, 3800);
  };

  const isCyberTrack = track.toLowerCase().includes("cyber");

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-black/60 relative overflow-hidden space-y-6">
      {/* Ambient background glow */}
      <div className={`absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
        isCyberTrack ? "bg-purple-600/15" : "bg-emerald-600/15"
      }`} />

      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              Domain Track & Problem Statement
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              {isRevealed ? "Assigned domain track & challenge statement" : "Spin the Matrix Wheel to unlock your competition domain"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Wheel Area */}
      {!showResult || isSpinning ? (
        <div className="flex flex-col items-center justify-center py-6 space-y-8">
          {!isSpinning && !isRevealed && (
            <div className="text-center space-y-2 max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-mono font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>DOMAIN TRACK LOCKED</span>
              </div>
              <h4 className="font-display font-bold text-xl text-white">
                Discover Your Hackathon Domain
              </h4>
              <p className="text-xs text-gray-400 font-mono">
                Click below to spin the wheel and reveal whether your team will be competing in <strong>Cyber Security</strong> or <strong>Med-Tech</strong>!
              </p>
            </div>
          )}

          {/* The Spinning Wheel */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Top Indicator Arrow */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-cyan-400 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            </div>

            {/* Glowing Outer Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.3)] pointer-events-none" />

            {/* Wheel Canvas / SVG */}
            <motion.div
              className="w-full h-full rounded-full overflow-hidden shadow-2xl relative"
              animate={{ rotate: rotationDegree }}
              transition={{
                duration: 3.6,
                ease: [0.15, 0.85, 0.25, 1], // Realistic wheel deceleration
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* 8 Slices */}
                {[...Array(8)].map((_, i) => {
                  const isCyberSlice = i % 2 === 0;
                  const startAngle = i * 45;
                  const endAngle = (i + 1) * 45;
                  
                  const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                  // Slice label angle
                  const midAngle = startAngle + 22.5;
                  const textX = 50 + 32 * Math.cos((Math.PI * midAngle) / 180);
                  const textY = 50 + 32 * Math.sin((Math.PI * midAngle) / 180);

                  return (
                    <g key={i}>
                      <path
                        d={pathData}
                        fill={isCyberSlice ? "#2e1065" : "#064e3b"}
                        stroke="#1e293b"
                        strokeWidth="0.8"
                      />
                      <text
                        x={textX}
                        y={textY}
                        fill={isCyberSlice ? "#d8b4fe" : "#6ee7b7"}
                        fontSize="3.8"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                      >
                        {isCyberSlice ? "CYBER" : "MED-TECH"}
                      </text>
                    </g>
                  );
                })}
                {/* Inner Center Hub */}
                <circle cx="50" cy="50" r="12" fill="#090d16" stroke="#06b6d4" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="4" fill="#06b6d4" />
              </svg>
            </motion.div>
          </div>

          {/* Spin Trigger Button */}
          {!isSpinning && (
            <button
              onClick={handleSpin}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400 text-black font-display font-extrabold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
            >
              <Sparkles className="w-5 h-5 text-black animate-pulse" />
              <span>SPIN WHEEL TO REVEAL TRACK</span>
            </button>
          )}

          {isSpinning && (
            <div className="flex items-center gap-2 font-mono text-cyan-400 text-xs font-bold animate-pulse">
              <RotateCw className="w-4 h-4 animate-spin" />
              <span>DECRYPTING MATRIX & ASSIGNING TRACK...</span>
            </div>
          )}
        </div>
      ) : (
        /* Revealed Track Card */
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="space-y-6"
          >
            {/* Domain Track Banner */}
            <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isCyberTrack
                ? "bg-purple-950/40 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                : "bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
            }`}>
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className={`p-3.5 rounded-2xl border shrink-0 ${
                  isCyberTrack
                    ? "bg-purple-900/60 border-purple-400 text-purple-300"
                    : "bg-emerald-900/60 border-emerald-400 text-emerald-300"
                }`}>
                  {isCyberTrack ? <Shield className="w-8 h-8" /> : <HeartPulse className="w-8 h-8" />}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">// OFFICIAL ASSIGNED TRACK</span>
                  <h4 className={`font-display font-black text-2xl uppercase tracking-wide ${
                    isCyberTrack ? "text-purple-300" : "text-emerald-300"
                  }`}>
                    {track}
                  </h4>
                  <p className="text-xs font-mono text-gray-300 mt-0.5">
                    Your team is assigned to build an innovative solution in the <strong>{track}</strong> domain.
                  </p>
                </div>
              </div>

              {problemStatementFileUrl && (
                <a
                  href={problemStatementFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-display font-bold text-xs uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.5)] shrink-0 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Problem PDF</span>
                </a>
              )}
            </div>

            {/* Problem Statement Details */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-cyan-400 tracking-wider uppercase">// PROBLEM STATEMENT BRIEF</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Track Unlocked
                </span>
              </div>
              <p className="text-gray-200 font-sans text-sm font-semibold leading-relaxed pt-1">
                {problemStatement}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
