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

export interface EventPhase {
  phase: string;
  title: string;
  date: string;
  description: string;
}

export interface Sponsor {
  name: string;
  logoPath: string;
}

export interface JuryMember {
  id: string;
  name: string;
  role: string;
  company: string;
  category: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
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
  registerUrl: "https://unstop.com/p/nexora-hackhere-1726957",
};

export const sponsors: Sponsor[] = [
  { name: "Sponsor 1", logoPath: "/sponsors/wp_sponsor_1.jpeg" },
  { name: "Sponsor 2", logoPath: "/sponsors/wp_sponsor_2.jpeg" },
  { name: "Sponsor 3", logoPath: "/sponsors/wp_sponsor_3.jpeg" },
  { name: "Sponsor 4", logoPath: "/sponsors/wp_sponsor_4.jpeg" },
  { name: "Sponsor 5", logoPath: "/sponsors/wp_sponsor_5.jpeg" },
  { name: "Sponsor 6", logoPath: "/sponsors/calendar_sponsor.png" },
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

export const phases: EventPhase[] = [
  {
    phase: "PHASE 1",
    title: "LAUNCH & REGISTRATION",
    date: "Online Submission Ends Aug 12",
    description: "Round 1 online screening — Idea/Abstract submission focusing on core domains through Unstop. Shortlisted on Innovation, Feasibility, Technical Approach, and Real-World Impact.",
  },
  {
    phase: "PHASE 2",
    title: "IDEATION & SHORTLISTING",
    date: "August 13 – August 16",
    description: "Deep dive into challenge domains and solution evaluations. The top shortlisted teams are selected for the offline grand finale.",
  },
  {
    phase: "PHASE 3",
    title: "BUILD (24H SPRINT)",
    date: "August 22 – August 23",
    description: "Build your working prototype at the physical venue (SNS IHUB, Coimbatore) over a continuous 24-hour period with direct mentorship support.",
  },
  {
    phase: "PHASE 4",
    title: "PITCH & AWARDS",
    date: "August 23",
    description: "Present your prototype to expert judges. Evaluated on Innovation, Execution, Impact, and Presentation.",
  },
];

export const juries: JuryMember[] = [
  {
    id: "jury-1",
    name: "Ranghan Venkatraman",
    role: "CEO",
    company: "Rezilyens",
    category: "Chief Guest",
    bio: "CEO of Rezilyens, leading cutting-edge technological resilience and business strategy.",
    image: "/juries/jury_1.jpeg",
    linkedin: "https://www.linkedin.com/in/ranghanvenkatraman/",
  },
  {
    id: "jury-2",
    name: "Ranjani Venkatraman",
    role: "Co-CEO",
    company: "Rezilyens",
    category: "Chief Guest",
    bio: "Co-CEO of Rezilyens, steering organizational growth, innovative technology operations, and enterprise strategy.",
    image: "/juries/jury_2.jpeg",
    linkedin: "https://www.linkedin.com/in/ranjani-venkatraman-2609a4176/",
  },
  {
    id: "jury-3",
    name: "Reinard Abhishek J",
    role: "Design Engineer II",
    company: "Becton Dickinson",
    category: "Jury Member",
    bio: "Design Engineer II at Becton Dickinson, specializing in medical device innovation and product engineering.",
    image: "/juries/jury_3.jpeg",
    linkedin: "https://www.linkedin.com/in/reinard-abhishek-a781a3179/",
  },
  {
    id: "jury-4",
    name: "Subhashini S",
    role: "HR and Insurance Trainer",
    company: "Pronoia IMF",
    category: "Jury Member",
    bio: "HR and Insurance Trainer at Pronoia IMF, empowering talent and professional excellence.",
    image: "/juries/jury_4.jpeg",
    linkedin: "https://www.linkedin.com/in/s-subhashini-625794230?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
];

export const faqs: FAQItem[] = [
  { question: "Who can participate?", answer: "NEXORA is open to developers, designers, students, and tech enthusiasts. Both beginners and experienced hackers are welcome!" },
  { question: "What is the team size?", answer: "Teams can range from 1 to 4 participants. You can form teams prior to the event or connect with teammates during Day 1 networking." },
  { question: "Is there a registration fee?", answer: "Round 1 registration is free! A registration fee of ₹1,000 per team is required only if your team is shortlisted for Round 2." },
  { question: "Where is NEXORA held?", answer: "NEXORA takes place in person at SNS IHUB, Coimbatore (August 22–23)." },
  { question: "What are the prizes and perks?", answer: "₹30,000 in cash prizes, direct internship offers from partner companies, and exclusive cloud/GPU credit offers for participants." },
  { question: "What should I bring?", answer: "Bring your laptop, charger, valid ID, and enthusiasm to build!" },
];
