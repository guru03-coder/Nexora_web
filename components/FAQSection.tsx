"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/event";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-28 bg-ink border-b border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-crimson/10 border border-crimson/30 font-mono text-xs text-crimson-glow uppercase tracking-widest">
            [ 05 // SYSTEM INQUIRIES ]
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            FREQUENTLY ASKED <span className="metal-gradient">QUESTIONS</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.03] border border-white/10 hover:border-crimson/40 transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-display text-base font-bold text-white hover:text-crimson-glow transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-crimson transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-crimson-glow" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-gray-300 font-sans text-sm leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
