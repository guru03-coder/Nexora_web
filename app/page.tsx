"use client";

import React, { useState } from "react";
import CircuitCanvas from "@/components/CircuitCanvas";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventDetailsBar from "@/components/EventDetailsBar";
import AboutSection from "@/components/AboutSection";
import TracksSection from "@/components/TracksSection";
import ScheduleSection from "@/components/ScheduleSection";
import SponsorsMarquee from "@/components/SponsorsMarquee";
import FAQSection from "@/components/FAQSection";
import RegisterCTASection from "@/components/RegisterCTASection";
import Footer from "@/components/Footer";
import RegisterModal from "@/components/RegisterModal";

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleCloseRegister = () => setIsRegisterOpen(false);

  return (
    <main className="relative min-h-screen bg-ink text-white selection:bg-crimson selection:text-white">
      {/* Ambient Tech Circuit Canvas */}
      <CircuitCanvas />

      {/* Navigation Bar */}
      <Navbar onRegisterClick={handleOpenRegister} />

      {/* Hero Section */}
      <HeroSection onRegisterClick={handleOpenRegister} />

      {/* Sticky Event Details Bar */}
      <EventDetailsBar onRegisterClick={handleOpenRegister} />

      {/* About Section */}
      <AboutSection />

      {/* Hackathon Tracks */}
      <TracksSection />

      {/* Run of Show / Schedule */}
      <ScheduleSection />

      {/* Sponsors Infinite Marquee */}
      <SponsorsMarquee />

      {/* FAQ Accordion */}
      <FAQSection />

      {/* Register CTA Section */}
      <RegisterCTASection onRegisterClick={handleOpenRegister} />

      {/* Footer */}
      <Footer />

      {/* Registration Modal Dialog */}
      <RegisterModal isOpen={isRegisterOpen} onClose={handleCloseRegister} />
    </main>
  );
}
