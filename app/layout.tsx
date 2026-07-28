import type { Metadata } from "next";
import { Orbitron, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXORA 2026 | Beyond Limits. Beyond Imagination — by HackHere",
  description: "NEXORA is a premier high-bandwidth AI & Deep-Tech Hackathon presented by HackHere in Coimbatore. Aug 29–30. $100k+ Prize Pool.",
  keywords: ["NEXORA", "HackHere", "Hackathon", "Coimbatore", "AI", "Web3", "GreenTech", "DeepTech", "DeepMind"],
  openGraph: {
    title: "NEXORA 2026 | Beyond Limits. Beyond Imagination — by HackHere",
    description: "Build beyond boundaries in Coimbatore. 48-hour global hackathon.",
    images: [
      {
        url: "/qr/nexora-qr.png",
        width: 1200,
        height: 630,
        alt: "NEXORA Hackathon Poster",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${orbitron.variable} ${playfair.variable} ${inter.variable} font-sans bg-ink text-gray-100 antialiased selection:bg-crimson selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
