export interface EventInfo {
  name: string;
  presentedBy: string;
  tagline: string;
  city: string;
  venue: string;
  dateRange: string;
  registerUrl: string;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  icon: string;
  prize?: string;
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
  tier?: string;
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
  venue: "Avinashi Road",
  dateRange: "August 29–30",
  registerUrl: "https://nexora.hackhere.org/register", // TODO: paste your registration form / link here
};

export const sponsors: Sponsor[] = [
  { name: "Journi", logoPath: "/sponsors/journi.jpeg", tier: "Title Sponsor" },
  { name: "Cristel", logoPath: "/sponsors/startuptn.jpeg", tier: "Platinum Sponsor" },
  { name: "Elyon", logoPath: "/sponsors/elyon.jpeg", tier: "Gold Sponsor" },
  { name: "Mindora", logoPath: "/sponsors/maestrominds.png", tier: "Gold Sponsor" },
  { name: "Featherless AI", logoPath: "/sponsors/featherlessai.jpeg", tier: "AI Partner" },
  { name: "PwC", logoPath: "/sponsors/logo_pwc.png", tier: "Enterprise Partner" },
  { name: "Wyntrix", logoPath: "/sponsors/wyntrix.jpeg", tier: "Innovation Partner" },
  { name: "Medo", logoPath: "/sponsors/medo.png", tier: "Healthcare Partner" }
];

export const tracks: Track[] = [
  { 
    id: "ai-ml", 
    title: "AI / ML & Autonomous Agents", 
    description: "Build intelligent systems, self-improving agents, and multi-modal neural frameworks that push the limits of automation.", 
    icon: "brain",
    prize: "$25,000 Prize"
  },
  { 
    id: "web3", 
    title: "Web3 & Blockchain Vault", 
    description: "Decentralized ideas, zero-knowledge proofs, and cryptographic architectures for a trustless autonomous future.", 
    icon: "link",
    prize: "$20,000 Prize"
  },
  { 
    id: "sustain", 
    title: "Sustainability & GreenTech", 
    description: "Tech solving real-world environmental problems, grid optimization, carbon tracking, and planetary AI.", 
    icon: "leaf",
    prize: "$20,000 Prize"
  },
  { 
    id: "open", 
    title: "Open Innovation", 
    description: "Anything goes — surprise us with unconventional hardware-software hacks, synthetic interfaces, or spatial intelligence.", 
    icon: "spark",
    prize: "$15,000 Prize"
  },
];

export const schedule: ScheduleDay[] = [
  {
    day: "Day 1",
    date: "August 29",
    items: [
      { time: "9:00 AM", title: "Registration & Check-in", description: "Collect your hacker pass, badge, and NEXORA swag bag." },
      { time: "10:00 AM", title: "Opening Ceremony", description: "Kickoff, rules briefing, sponsor API reveals, and keynote." },
      { time: "11:00 AM", title: "Hacking Begins", description: "Doors open, compute grants distributed, mentor support live." },
      { time: "4:00 PM", title: "Technical Workshop", description: "Deploying Agentic Frameworks & High-Performance GPUs." },
      { time: "9:00 PM", title: "Midnight Hacker Lounge", description: "Gaming room, live DJ set, and late-night pizza sprint." }
    ],
  },
  {
    day: "Day 2",
    date: "August 30",
    items: [
      { time: "10:00 AM", title: "Submissions Close", description: "Final code freeze on Devpost/GitHub. Project locks." },
      { time: "11:00 AM", title: "Judging Round 1", description: "Booth judging and technical verification by panel." },
      { time: "2:00 PM", title: "Grand Finalist Pitches", description: "Top 10 teams pitch live on main stage." },
      { time: "4:00 PM", title: "Closing & Awards Ceremony", description: "$100k Prize Distribution & VC Seed Investment Announcement." },
    ],
  },
];

export const faqs: FAQItem[] = [
  { 
    question: "Who can participate in NEXORA?", 
    answer: "NEXORA is open to developers, university students, researchers, designers, and tech enthusiasts worldwide. Both beginners and experienced hackers are welcome." 
  },
  { 
    question: "What is the team size?", 
    answer: "Teams can range from 1 (solo hacker) up to 4 members. You can form your team beforehand or meet team members during the Day 1 team matching session." 
  },
  { 
    question: "Is there a registration fee?", 
    answer: "No! NEXORA is 100% free of charge thanks to HackHere and our sponsors. Food, drinks, swag, compute credits, and workspace are provided." 
  },
  { 
    question: "What should I bring?", 
    answer: "Bring your laptop, charger, valid government photo ID, personal toiletries if staying overnight, and your relentless passion to build." 
  },
  { 
    question: "Are there prizes and investment opportunities?", 
    answer: "Yes! We have $100,000+ in total prizes across track categories, plus direct VC seed investment funding for winning teams." 
  },
];
