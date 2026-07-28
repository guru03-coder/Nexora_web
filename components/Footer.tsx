"use client";

import React from "react";
import { event, sponsors } from "@/data/event";

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10 pt-16 pb-12 text-gray-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded border border-crimson/50 bg-crimson/10 flex items-center justify-center font-display font-bold text-crimson">
                H
              </div>
              <span className="font-display text-2xl font-black tracking-widest metal-gradient">
                {event.name}
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Presented by <strong className="text-white">{event.presentedBy}</strong>. Architectural hackathon designed for high-bandwidth engineering and deep-tech innovation.
            </p>
            <p className="font-serif italic text-sm text-gray-300">
              &ldquo;{event.tagline}&rdquo;
            </p>
          </div>

          {/* Event Info Column */}
          <div className="space-y-3 font-mono">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-widest mb-2">
              EVENT SPECS
            </h4>
            <p>📍 {event.city}, {event.venue}</p>
            <p>📅 {event.dateRange}, 2026</p>
            <p>⚡ 48 Hours Non-Stop</p>
            <p>🏆 $100k+ Prize Pool</p>
          </div>

          {/* Key Partners */}
          <div className="space-y-3 font-mono">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-widest mb-2">
              KEY PARTNERS
            </h4>
            <div className="flex flex-wrap gap-2 text-[11px]">
              {sponsors.map((s, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* Socials / Support */}
          <div className="space-y-3 font-mono">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-widest mb-2">
              CONNECT
            </h4>
            <p>Discord: <a href="#" className="hover:text-crimson">discord.gg/hackhere</a></p>
            <p>Twitter: <a href="#" className="hover:text-crimson">@hackhere_org</a></p>
            <p>Contact: <a href="mailto:hello@hackhere.org" className="hover:text-crimson">hello@hackhere.org</a></p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div>
            © 2026 {event.presentedBy} & {event.name}. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6 text-gray-400">
            <a href="#" className="hover:text-white">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white">CODE OF CONDUCT</a>
            <a href="#" className="hover:text-white">TERMS & CONDITIONS</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
