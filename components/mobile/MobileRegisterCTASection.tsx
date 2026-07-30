"use client";

import Image from "next/image";
import { event } from "@/data/event";
import { QrCode, ArrowRight, ExternalLink } from "lucide-react";

interface MobileRegisterCTASectionProps {
  onRegisterClick: () => void;
}

export default function MobileRegisterCTASection({ onRegisterClick }: MobileRegisterCTASectionProps) {
  return (
    <section className="py-16 px-4 bg-ink relative z-10 border-t border-cyan-500/20">
      <div className="max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-b from-cyan-950/80 to-ink border-2 border-cyan-400/60 shadow-[0_0_30px_rgba(0,229,255,0.3)] space-y-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/50 text-cyan-300 text-[10px] font-mono uppercase tracking-widest">
          <span>LIMITED SPOTS • REGISTER TODAY</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-2xl font-display font-extrabold text-white">
            READY TO SHAPE THE <span className="text-cyan-400">NEXT ERA?</span>
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Join top builders at {event.city} on {event.dateRange}. Claim your pass for the 24-hour hackathon.
          </p>
        </div>

        {/* QR Code Graphic */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <a
            href={event.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white rounded-2xl border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.4)] block"
          >
            <div className="relative w-36 h-36">
              <Image
                src="/qr/nexora-qr.png"
                alt="Registration QR Code"
                fill
                className="object-contain"
              />
            </div>
          </a>
          <span className="text-[10px] font-mono text-gray-400">
            Scan or tap QR to open Unstop portal
          </span>
        </div>

        {/* Direct Button */}
        <div className="space-y-3">
          <a
            href={event.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-full bg-cyan-400 text-black font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,229,255,0.8)] active:scale-95 transition-transform"
          >
            <QrCode className="w-4 h-4" />
            <span>REGISTER NOW ON UNSTOP</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <p className="text-[11px] font-mono text-cyan-300">
            ₹1,000/Team Fee (Direct Entry to 24H Finale) • ₹30K Pool
          </p>
        </div>
      </div>
    </section>
  );
}
