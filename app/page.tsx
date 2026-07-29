"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Components
import IntroLoader from "@/components/IntroLoader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventDetailsBar from "@/components/EventDetailsBar";
import AboutSection from "@/components/AboutSection";
import TracksSection from "@/components/TracksSection";
import ScheduleSection from "@/components/ScheduleSection";
import SponsorsMarquee from "@/components/SponsorsMarquee";
import JuriesSection from "@/components/JuriesSection";
import FAQSection from "@/components/FAQSection";
import RegisterCTASection from "@/components/RegisterCTASection";
import Footer from "@/components/Footer";
import QRModal from "@/components/QRModal";

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleOpenQRModal = () => {
    setIsQRModalOpen(true);
  };

  const handleCloseQRModal = () => {
    setIsQRModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-ink text-white selection:bg-crimson selection:text-white">
      {/* Pre-loader video overlay */}
      {!loaderComplete && (
        <IntroLoader onComplete={() => setLoaderComplete(true)} />
      )}

      {/* Main Website Flow */}
      <div className={!loaderComplete ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-700"}>
        {/* Fixed Navbar */}
        <Navbar onRegisterClick={handleOpenQRModal} />

        {/* Hero Section */}
        <HeroSection onRegisterClick={handleOpenQRModal} />

        {/* Sticky Details Bar */}
        <EventDetailsBar onRegisterClick={handleOpenQRModal} />

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <AboutSection />
        </motion.div>

        {/* Tracks Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <TracksSection />
        </motion.div>

        {/* Schedule Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <ScheduleSection />
        </motion.div>

        {/* Sponsors Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <SponsorsMarquee />
        </motion.div>

        {/* Juries & Chief Guests Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <JuriesSection />
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <FAQSection />
        </motion.div>

        {/* Register CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <RegisterCTASection onRegisterClick={handleOpenQRModal} />
        </motion.div>

        {/* Footer */}
        <Footer />

        {/* Registration QR Modal */}
        <QRModal isOpen={isQRModalOpen} onClose={handleCloseQRModal} />
      </div>
    </main>
  );
}
