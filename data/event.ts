export interface EventInfo {
  name: string;
  presentedBy: string;
  tagline: string;
  city: string;
  venue: string;
  mapUrl: string;
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
  mapUrl: "https://maps.app.goo.gl/5Qv5T9LsVeL58uxd8",
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
    prize: "₹30K Pool + Bounties"
  },
  { 
    id: "web3", 
    title: "Web3 & Zero-Knowledge AI", 
    description: "Decentralized ideas for a trustless future, cryptographic zkML proofs, and confidential enclave security.", 
    icon: "link",
    prize: "Internship & Bounties"
  },
  { 
    id: "sustain", 
    title: "Sustainability & GreenTech", 
    description: "Tech solving real-world environmental challenges, energy distribution algorithms, and smart grid systems.", 
    icon: "leaf",
    prize: "Credits & Perks"
  },
  { 
    id: "robotics", 
    title: "Robotics & Spatial AI", 
    description: "Vision-language-action (VLA) models for humanoid robotics, drone swarms, and spatial intelligence.", 
    icon: "bot",
    prize: "Hardware & Bounties"
  },
  { 
    id: "open", 
    title: "Open Innovation", 
    description: "Anything goes — surprise us with high-impact, disruptive solutions.", 
    icon: "sparkles",
    prize: "Special Bounties"
  },
];

export const schedule: ScheduleDay[] = [
  {
    day: "Day 1",
    date: "August 22",
    items: [
      { time: "09:00 AM", title: "Registration & Check-in", description: "Collect hacker badges, welcome kits, and compute credentials at SNS IHUB." },
      { time: "10:00 AM", title: "Opening Ceremony", description: "Kickoff, rules briefing, sponsor challenges & track reveal." },
      { time: "11:00 AM", title: "24-Hour Hacking Begins", description: "API keys & GPU compute grants distributed. Hacking officially unlocked!" },
      { time: "03:00 PM", title: "Technical Workshop", description: "Building Autonomous Swarms with Next-Gen Agentic Tools." },
      { time: "08:00 PM", title: "Dinner & Mentor Speed-Dating", description: "Connect with 1-on-1 industry and AI engineering mentors." },
    ],
  },
  {
    day: "Day 2",
    date: "August 23",
    items: [
      { time: "09:00 AM", title: "Breakfast & Pitch Prep", description: "Refine slide decks, live demos, and project submissions." },
      { time: "11:00 AM", title: "Hacking Concludes & Submissions", description: "Hard code freeze on GitHub & Devpost repositories." },
      { time: "11:30 AM", title: "Judging & Demos", description: "Project evaluations by expert jury panel." },
      { time: "02:30 PM", title: "Top Finalist Demos", description: "Live main stage pitches to partner companies." },
      { time: "04:00 PM", title: "Closing & Awards Ceremony", description: "₹30,000 prize distribution, internship offers & credit announcements." },
    ],
  },
];

export const faqs: FAQItem[] = [
  { question: "Who can participate?", answer: "NEXORA is open to developers, designers, students, and tech enthusiasts. Both beginners and experienced hackers are welcome!" },
  { question: "What is the team size?", answer: "Teams can range from 1 to 4 participants. You can form teams prior to the event or connect with teammates during Day 1 networking." },
  { question: "Is there a registration fee?", answer: "No! Participation in NEXORA is 100% free. All accepted hackers receive meals, swag, and compute credit offers." },
  { question: "Where is NEXORA held?", answer: "NEXORA takes place in person at SNS IHUB, Coimbatore (August 22–23)." },
  { question: "What are the prizes and perks?", answer: "₹30,000 in cash prizes, direct internship offers from partner companies, and exclusive cloud/GPU credit offers for participants." },
  { question: "What should I bring?", answer: "Bring your laptop, charger, valid ID, and enthusiasm to build!" },
];
