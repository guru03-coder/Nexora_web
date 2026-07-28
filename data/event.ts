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
    id: "ai", 
    title: "Artificial Intelligence", 
    description: "Build intelligent systems that learn, adapt, and transform industries", 
    icon: "bot",
    prize: "₹30K Pool + Bounties"
  },
  { 
    id: "cyber", 
    title: "Cyber Security", 
    description: "Defend digital frontiers with innovative security solutions and threat detection", 
    icon: "shield",
    prize: "Internship & Bounties"
  },
  { 
    id: "blockchain", 
    title: "BlockChain", 
    description: "Build decentralized applications and trustless systems for the future", 
    icon: "link",
    prize: "Credits & Perks"
  },
  { 
    id: "devops", 
    title: "DevOps", 
    description: "Automate, integrate, and deploy — streamline the software lifecycle", 
    icon: "settings",
    prize: "Special Bounties"
  },
];

export const schedule: ScheduleDay[] = [
  {
    day: "Day 1",
    date: "August 22",
    items: [
      { time: "09:00 AM", title: "Registration & Check-in", description: "Collect hacker badges, welcome kits, and compute credentials at SNS IHUB." },
      { time: "10:00 AM", title: "Opening Ceremony", description: "Kickoff, rules briefing, sponsor challenges & domain reveal." },
      { time: "11:00 AM", title: "24-Hour Hacking Begins", description: "API keys & GPU compute grants distributed. Hacking officially unlocked!" },
      { time: "03:00 PM", title: "Technical Workshop", description: "Building Autonomous Swarms & Next-Gen Infrastructure." },
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
