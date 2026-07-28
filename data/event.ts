export interface EventInfo {
  name: string;
  presentedBy: string;
  tagline: string;
  city: string;
  venue: string;
  venueUrl: string;
  dateRange: string;
  registerUrl: string;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  icon: string;
  prize: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

export interface ScheduleDay {
  day: string;
  date: string;
  items: ScheduleItem[];
}

export interface Sponsor {
  name: string;
  logoPath: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const event: EventInfo = {
  name: "NEXORA",
  presentedBy: "HackHere",
  tagline: "Beyond Limits. Beyond Imagination",
  city: "Coimbatore",
  venue: "SNS IHUB",
  venueUrl: "https://share.google/liE6KCTvmAmmcnOBK",
  dateRange: "August 22–23",
  registerUrl: "#register",
};

export const sponsors: Sponsor[] = [
  { name: "Journi", logoPath: "/sponsors/journi.jpeg" },
  { name: "Elyon", logoPath: "/sponsors/elyon.jpeg" },
  { name: "Featherless AI", logoPath: "/sponsors/featherlessai.jpeg" },
  { name: "PwC", logoPath: "/sponsors/logo_pwc.png" },
  { name: "StartupTN", logoPath: "/sponsors/startuptn.jpeg" },
  { name: "Wyntrix", logoPath: "/sponsors/wyntrix.jpeg" },
  { name: "MaestroMinds", logoPath: "/sponsors/maestrominds.png" },
  { name: "Medo", logoPath: "/sponsors/medo.png" },
];

export const tracks: Track[] = [
  { 
    id: "ai-ml", 
    title: "AI / ML & Autonomous Agents", 
    description: "Build intelligent systems that push the limits of automation, multi-agent frameworks, and self-improving neural models.", 
    icon: "brain",
    prize: "$25,000"
  },
  { 
    id: "web3", 
    title: "Web3 & Zero-Knowledge AI", 
    description: "Decentralized ideas for a trustless future, cryptographic zkML proofs, and confidential enclave security.", 
    icon: "link",
    prize: "$20,000"
  },
  { 
    id: "sustain", 
    title: "Sustainability & GreenTech", 
    description: "Tech solving real-world environmental challenges, energy distribution algorithms, and smart grid systems.", 
    icon: "leaf",
    prize: "$15,000"
  },
  { 
    id: "robotics", 
    title: "Robotics & Spatial AI", 
    description: "Vision-language-action (VLA) models for humanoid robotics, drone swarms, and spatial intelligence.", 
    icon: "bot",
    prize: "$20,000"
  },
  { 
    id: "open", 
    title: "Open Innovation", 
    description: "Anything goes — surprise us with high-impact, disruptive solutions.", 
    icon: "sparkles",
    prize: "$20,000"
  },
];

export const schedule: ScheduleDay[] = [
  {
    day: "Day 1",
    date: "August 22",
    items: [
      { time: "09:00 AM", title: "Registration & Check-in", description: "Collect hacker badges, welcome kits, and compute credentials." },
      { time: "10:00 AM", title: "Opening Ceremony", description: "Kickoff, rules briefing, sponsor challenges & track reveal." },
      { time: "11:00 AM", title: "Hacking Begins", description: "API keys & GPU compute grants distributed. Hacking officially unlocked!" },
      { time: "03:00 PM", title: "Technical Workshop", description: "Building Autonomous Swarms with Next-Gen Agentic Tools." },
      { time: "08:00 PM", title: "Dinner & Mentor Speed-Dating", description: "Connect with 1-on-1 VC and AI engineering mentors." },
    ],
  },
  {
    day: "Day 2",
    date: "August 23",
    items: [
      { time: "09:00 AM", title: "Breakfast & Pitch Prep", description: "Refine slide decks, live demos, and project submissions." },
      { time: "10:00 AM", title: "Submissions Close", description: "Hard code freeze on GitHub & Devpost repositories." },
      { time: "11:00 AM", title: "Judging Round 1", description: "Expo-style booth reviews by expert jury panel." },
      { time: "02:30 PM", title: "Top 10 Finalist Demos", description: "Live main stage pitches to venture capital partners." },
      { time: "04:00 PM", title: "Closing & Awards Ceremony", description: "$100,000+ prize pool distribution & seed launchpad announcements." },
    ],
  },
];

export const faqs: FAQItem[] = [
  { question: "Who can participate?", answer: "NEXORA is open to all developers, designers, students, and AI researchers worldwide. Both beginners and experienced hackers are welcome!" },
  { question: "What is the team size?", answer: "Teams can range from 1 to 4 participants. You can form teams prior to the event or connect with teammates during Day 1 networking." },
  { question: "Is there a registration fee?", answer: "No! Participation in NEXORA is 100% free. All accepted hackers receive free meals, swag, and cloud GPU compute credits." },
  { question: "What should I bring?", answer: "Bring your laptop, charger, valid government ID, enthusiasm, and any hardware components if you are competing in the Robotics track." },
  { question: "Are there prizes?", answer: "Yes! Over $100,000 in cash prizes, sponsor bounties, VC investment opportunities, and incubation support are up for grabs." },
];
