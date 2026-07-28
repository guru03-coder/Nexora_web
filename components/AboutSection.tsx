"use client";

import { motion } from "framer-motion";
import { event } from "@/data/event";
import { Zap, Trophy, Briefcase, Gift, MapPin, Calendar, Clock, Globe, Award, ExternalLink } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-ink border-t border-white/5">
      {/* Glow highlights */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-crimson/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-crimson-glow">
            [ 01 // OVERVIEW ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold mt-2 mb-6">
            WELCOME TO <span className="metal-gradient">{event.name}</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans">
            Hosted by <strong className="text-white">{event.presentedBy}</strong> at{" "}
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson-glow hover:underline underline-offset-4 font-semibold"
            >
              {event.venue}, {event.city} ↗
            </a>
            , NEXORA is a 24-hour hackathon crucible. Build self-evolving AI systems, decentralized protocols, and biomorphic models that redefine what is possible.
          </p>
        </motion.div>

        {/* EVENT DATA / MISSION DATA Grid (Styled exactly like VORTEXA / Image 1) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20 glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden"
        >
          {/* Left Column: Huge Graphic Title "EVENT DATA" with Outlined DATA */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-0">
              <h2 className="text-5xl sm:text-7xl font-display font-black text-white tracking-wider uppercase leading-none">
                EVENT
              </h2>
              <h2 className="text-5xl sm:text-7xl font-display font-black tracking-wider uppercase leading-tight text-transparent [-webkit-text-stroke:1.5px_#00E5FF] drop-shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                DATA
              </h2>
            </div>
            <p className="text-xs font-mono text-gray-400 mt-4 max-w-sm leading-relaxed uppercase tracking-wider">
              /// CORE LOGISTICS & CRUCIAL SPECIFICATIONS FOR NEXORA 2026.
            </p>
          </div>

          {/* Right Column: Stacked Sleek Cards with Glowing Right Accent Bars */}
          <div className="lg:col-span-7 space-y-3.5">
            
            {/* Card 1: VENUE */}
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative bg-black/80 backdrop-blur-xl border border-white/10 hover:border-crimson/50 rounded-xl p-4 sm:p-5 transition-all duration-300 shadow-md overflow-hidden"
            >
              <div className="flex items-center justify-between pr-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-crimson/10 border border-crimson/30 flex items-center justify-center text-crimson-glow shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-gray-400 mb-0.5">
                      VENUE
                    </div>
                    <div className="text-base sm:text-xl font-display font-bold text-crimson-glow group-hover:underline underline-offset-4 flex items-center gap-1.5">
                      {event.venue}, {event.city}
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-crimson-glow" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Neon right border accent bar */}
              <div className="w-1.5 h-full absolute right-0 top-0 bg-crimson-glow shadow-[0_0_15px_#00E5FF] rounded-r-xl" />
            </a>

            {/* Card 2: DATES */}
            <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-5 shadow-md overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-gray-400 mb-0.5">
                    DATES
                  </div>
                  <div className="text-base sm:text-xl font-display font-bold text-pink-400">
                    August 22–23, 2026
                  </div>
                </div>
              </div>
              {/* Pink right border accent bar */}
              <div className="w-1.5 h-full absolute right-0 top-0 bg-pink-500 shadow-[0_0_15px_#EC4899] rounded-r-xl" />
            </div>

            {/* Card 3: DURATION */}
            <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-5 shadow-md overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-gray-400 mb-0.5">
                    DURATION
                  </div>
                  <div className="text-base sm:text-xl font-display font-bold text-cyan-400">
                    24 Hours
                  </div>
                </div>
              </div>
              {/* Cyan right border accent bar */}
              <div className="w-1.5 h-full absolute right-0 top-0 bg-cyan-400 shadow-[0_0_15px_#00E5FF] rounded-r-xl" />
            </div>

            {/* Card 4: MODE */}
            <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 sm:p-5 shadow-md overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-gray-400 mb-0.5">
                    MODE
                  </div>
                  <div className="text-base sm:text-xl font-display font-bold text-white">
                    In-Person & Hybrid
                  </div>
                </div>
              </div>
              {/* Indigo right border accent bar */}
              <div className="w-1.5 h-full absolute right-0 top-0 bg-indigo-400 shadow-[0_0_15px_#818CF8] rounded-r-xl" />
            </div>

            {/* Card 5: PRIZE POOL */}
            <div className="relative bg-black/80 backdrop-blur-xl border border-amber-500/30 rounded-xl p-4 sm:p-5 shadow-md overflow-hidden bg-gradient-to-r from-amber-500/10 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-gray-400 mb-0.5">
                    PRIZE POOL & PERKS
                  </div>
                  <div className="text-base sm:text-xl font-display font-bold text-amber-400">
                    ₹30,000 + Internship & Credit Offers
                  </div>
                </div>
              </div>
              {/* Gold right border accent bar */}
              <div className="w-1.5 h-full absolute right-0 top-0 bg-amber-400 shadow-[0_0_15px_#F59E0B] rounded-r-xl" />
            </div>

          </div>

        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Zap,
              title: "24H Non-Stop Sprint",
              desc: "Pure uninterrupted 24-hour hack time with compute infrastructure and technical mentors.",
            },
            {
              icon: Trophy,
              title: "₹30K Prize Pool",
              desc: "Cash awards and track bounties distributed to top-performing teams.",
            },
            {
              icon: Briefcase,
              title: "Internship Opportunities",
              desc: "Direct internship offers and recruitment pathways from partner companies.",
            },
            {
              icon: Gift,
              title: "Compute & Credit Offers",
              desc: "Exclusive cloud GPU compute grants and premium developer API credit offers.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-panel p-6 rounded-2xl hover:border-crimson/60 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-crimson/10 border border-crimson/30 flex items-center justify-center text-crimson-glow mb-4 group-hover:scale-110 group-hover:bg-crimson/20 transition-all">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 text-white group-hover:text-crimson-glow transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
