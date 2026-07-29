"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Desktop Components (100% UNTOUCHED)
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

// Mobile Components (SEPARATE MOBILE VIEW)
import MobileNavbar from "@/components/mobile/MobileNavbar";
import MobileHeroSection from "@/components/mobile/MobileHeroSection";
import MobileEventDetailsBar from "@/components/mobile/MobileEventDetailsBar";
import MobileAboutSection from "@/components/mobile/MobileAboutSection";
import MobileTracksSection from "@/components/mobile/MobileTracksSection";
import MobileScheduleSection from "@/components/mobile/MobileScheduleSection";
import MobileSponsorsMarquee from "@/components/mobile/MobileSponsorsMarquee";
import MobileJuriesSection from "@/components/mobile/MobileJuriesSection";
import MobileFAQSection from "@/components/mobile/MobileFAQSection";
import MobileRegisterCTASection from "@/components/mobile/MobileRegisterCTASection";
import MobileFooter from "@/components/mobile/MobileFooter";

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

        {/* ========================================== */}
        {/* DESKTOP VIEW (100% ORIGINAL & UNTOUCHED)   */}
        {/* ========================================== */}
        <div className="hidden md:block">
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
        </div>

        {/* ========================================== */}
        {/* MOBILE VIEW (DEDICATED SEPARATE MOBILE UI) */}
        {/* ========================================== */}
        <div className="block md:hidden">
          <MobileNavbar onRegisterClick={handleOpenQRModal} />
          <MobileHeroSection onRegisterClick={handleOpenQRModal} />
          <MobileAboutSection />
          <MobileTracksSection />
          <MobileScheduleSection />
          <MobileSponsorsMarquee />
          <MobileJuriesSection />
          <MobileFAQSection />
          <MobileRegisterCTASection onRegisterClick={handleOpenQRModal} />
          <MobileFooter />
          <MobileEventDetailsBar onRegisterClick={handleOpenQRModal} />
        </div>

        {/* Registration QR Modal */}
        <QRModal isOpen={isQRModalOpen} onClose={handleCloseQRModal} />
      </div>
    </main>
  );
}
