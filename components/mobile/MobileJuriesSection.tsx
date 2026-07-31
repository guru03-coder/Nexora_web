"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { juries, JuryMember } from "@/data/event";
import { Linkedin, UserCheck, Crown, ShieldCheck, Sparkles } from "lucide-react";

export default function MobileJuriesSection() {
  const chiefGuests = juries.filter((item) => item.category === "Chief Guest");
  const juryMembers = juries.filter((item) => item.category !== "Chief Guest");

  return (
    <section id="juries" className="py-16 px-4 bg-ink relative z-10 border-t border-cyan-500/20">
      <div className="max-w-md mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-widest">
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>HONORED GUESTS & EVALUATORS</span>
          </div>
          <h2 className="text-2xl font-display font-extrabold text-white">
            CHIEF GUEST & <span className="text-cyan-400">JURY PANEL</span>
          </h2>
          <p className="text-xs text-gray-300">
            Meet the industry leaders, executives, and mentors evaluating NEXORA 2026.
          </p>
        </div>

        {/* ================= SUBSECTION 1: CHIEF GUEST ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
              CHIEF GUEST OF HONOR
            </h3>
          </div>

          {chiefGuests.map((person: JuryMember) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-5 rounded-3xl bg-gradient-to-b from-amber-950/70 via-ink to-black border-2 border-amber-400/70 space-y-4 relative overflow-hidden backdrop-blur-sm shadow-[0_0_25px_rgba(251,191,36,0.2)]"
            >
              {/* Header Telemetry Badge */}
              <div className="flex items-center justify-between border-b pb-3 border-amber-500/30">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-amber-400 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>CHIEF GUEST</span>
                </span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>

              {/* Photo & Identity */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400/80 shrink-0 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <h4 className="text-base font-display font-extrabold text-white truncate">
                    {person.name}
                  </h4>
                  <p className="text-xs font-mono font-semibold text-amber-300 truncate">
                    {person.role}
                  </p>
                  <p className="text-[11px] text-gray-300 truncate">
                    {person.company}
                  </p>
                </div>
              </div>

              {person.linkedin && (
                <div className="pt-2">
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-amber-950/80 hover:bg-amber-400 hover:text-black border border-amber-500/50 text-amber-300 font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ================= SUBSECTION 2: JURY PANEL ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              EXPERT JURY PANEL
            </h3>
          </div>

          <div className="space-y-4">
            {juryMembers.map((jury: JuryMember, idx: number) => (
              <motion.div
                key={jury.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-white/5 border border-cyan-500/40 space-y-4 relative overflow-hidden backdrop-blur-sm shadow-[0_0_20px_rgba(0,229,255,0.15)]"
              >
                {/* Header Telemetry Badge */}
                <div className="flex items-center justify-between border-b pb-3 border-cyan-500/20">
                  <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">
                    JUDGE 0{idx + 1}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                </div>

                {/* Photo & Identity */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-cyan-400/60 shrink-0 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                    <Image
                      src={jury.image}
                      alt={jury.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-base font-display font-extrabold text-white truncate">
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
                  <div className="pt-2">
                    <a
                      href={jury.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-400 hover:text-black border border-cyan-500/40 text-cyan-300 font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                    >
                      <Linkedin className="w-4 h-4" />
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
