"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { juries, JuryMember } from "@/data/event";
import { Linkedin, UserCheck, ShieldCheck } from "lucide-react";

export default function MobileJuriesSection() {
  const juryMembers = juries.filter((item) => item.category !== "Chief Guest");

  return (
    <section id="juries" className="py-12 px-4 bg-ink relative z-10 border-t border-cyan-500/20">
      <div className="max-w-md mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-widest">
            <UserCheck className="w-3 h-3 text-cyan-400" />
            <span>EXPERT EVALUATORS</span>
          </div>
          <h2 className="text-xl font-display font-extrabold text-white">
            EXPERT <span className="text-cyan-400">JURY PANEL</span>
          </h2>
          <p className="text-[11px] text-gray-300">
            Meet the industry leaders and mentors evaluating the event.
          </p>
        </div>

        {/* ================= JURY PANEL ================= */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
              EXPERT JURY PANEL
            </h3>
          </div>

          <div className="space-y-3">
            {juryMembers.map((jury: JuryMember, idx: number) => (
              <motion.div
                key={jury.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-4 rounded-xl bg-white/5 border border-cyan-500/40 space-y-3 relative overflow-hidden backdrop-blur-sm shadow-[0_0_15px_rgba(0,229,255,0.12)]"
              >
                {/* Photo & Identity */}
                <div className="flex items-center gap-3.5 pt-1">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-cyan-400/60 shrink-0 shadow-[0_0_12px_rgba(0,229,255,0.25)]">
                    <Image
                      src={jury.image}
                      alt={jury.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-sm font-display font-extrabold text-white truncate">
                      {jury.name}
                    </h4>
                    <p className="text-xs font-mono font-semibold text-cyan-300 truncate">
                      {jury.role}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">
                      {jury.company}
                    </p>
                  </div>
                </div>

                {/* LinkedIn Button */}
                {jury.linkedin && (
                  <div className="pt-1">
                    <a
                      href={jury.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-400 hover:text-black border border-cyan-500/40 text-cyan-300 font-display text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>Connect on LinkedIn</span>
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
