export const site = {
  legalName: "Hacked0ff Cybersecurity",
  shortName: "Hacked0ff",
  email: "info@hacked0ff.com",
  tagline:
    "When business is personal, you need a cybersecurity professional you can trust.",
  positioning: `We help family businesses, closely held companies, and high-net-worth households identify and reduce cyber risk through practical, effective security solutions.

No buzzwords. No bloated programs. No selling you what you don't need.

Just clear advice, meaningful protection, and a trusted partner focused on your cyber risk, so you can focus on your business.`,
  description:
    "Trusted cybersecurity counsel for family businesses and high-net-worth owners. Assessment, managed protection, and incident readiness without building an internal security team.",
} as const;

export const nav = [
  { href: "#why", label: "Why it matters" },
  { href: "#services", label: "Services" },
  { href: "#outcomes", label: "Outcomes" },
  { href: "#contact", label: "Request a conversation" },
] as const;

export const stats = [
  {
    value: "81%",
    label: "of small businesses reported suffering a security breach, a data breach or both in the past year.",
    source: "Identity Theft Resource Center, 2025 Business Impact Report",
    href: "https://www.idtheftcenter.org/post/2025-business-impact-report-cybercrime-costs-passed-consumers/",
  },
  {
    value: "70%",
    label: "of small-business Incident Responces were associated with ransomware",
    source: "Sophos, Annual Threat Report 2025: Cybercrime on Main Street",
    href: "https://www.sophos.com/en-gb/blog/the-sophos-annual-threat-report-cybercrime-on-main-street-2025",
  },
  {
    value: "15%",
    label: "of different attack techniques are now being bolstered by generative AI",
    source: "Verizon, 2026 Data Breach Investigations Report, May 2026",
    href: "https://www.verizon.com/business/resources/reports/dbir/",
  },
  {
    value: "56%",
    label: "increase of AI-enabled malicious breaches in the last year",
    source: "IBM Cost of a Data Breach Report, 2026",
    href: "https://newsroom.ibm.com/2026-07-29-ibm-study-one-in-four-malicious-breaches-are-ai-enabled%2C-costing-companies-6-million-on-average?lnk=hpln1id",
  },
] as const;

export const supportingFacts: {
  title: string;
  body: string;
  source?: string;
}[] = [
  {
    title: "You are not too small to be a target.",
    body: "Attackers look for valuable data and weak defenses, not headlines. Family businesses hold payroll, banking access, customer records, and personal wealth in the same environment — and often without a dedicated security team.",
  },
  {
    title: "Antivirus is not a security program.",
    body: "About 75% of attacks are now malware-free, using stolen credentials and built-in tools that legacy antivirus never sees. A firewall and a password policy are hygiene, not protection.",
    source: "CrowdStrike Global Threat Report, 2025",
  },
  {
    title: "Recovery is not a given.",
    body: "One in three small businesses say they would likely or definitely close after a cyberattack. For a family company, that is not an IT outage. It is the business, the reputation, and the household.",
    source: "TechValidate survey of SMBs, 2024",
  },
];

export const audiences = [
  {
    title: "Family businesses",
    body: "Owners who live the P&L, share a last name with the company, and cannot afford a 24/7 security department.",
  },
  {
    title: "Closely held companies",
    body: "Small groups of partners who need a trusted advisor, not a vendor ticket queue or a 200-page enterprise proposal.",
  },
  {
    title: "Family offices & high-net-worth households",
    body: "Where business systems, personal wealth, travel, staff, and third parties overlap — and a breach is both financial and personal.",
  },
] as const;

export const services = [
  {
    number: "01",
    title: "Assess & understand",
    offer: "Initial IT and cybersecurity assessment, documentation, and recommendations",
    promise:
      "A clear picture of what you have, where risk actually sits, and what is worth doing first.",
    outcomes: [
      "A documented baseline of systems, users, vendors, and data",
      "A plain-language view of your real exposure — not a scare deck",
      "A prioritized roadmap sized to how you actually operate",
    ],
  },
  {
    number: "02",
    title: "Protect & manage",
    offer: "Managed IT and cybersecurity services",
    promise:
      "Someone competent is watching, maintaining, and answering — so technology stays available and attackers do not get a free pass.",
    outcomes: [
      "Proactive monitoring, patching, and vulnerability management",
      "Threat detection with a human who will pick up the phone",
      "Less operational burden on owners and a lean internal team",
    ],
  },
  {
    number: "03",
    title: "Prepare & respond",
    offer: "Incident response planning, readiness, and coordination",
    promise:
      "When something goes wrong, you already know who to call, what to do, and how to keep the business moving.",
    outcomes: [
      "A client-specific response plan and playbooks leadership can actually use",
      "A coordinator function, not a binder that sits on a shelf",
      "Cyber insurance, legal, and specialist resources lined up before you need them",
    ],
  },
] as const;

export const outcomes = [
  {
    title: "Clarity instead of guesswork",
    body: "You know what is in your environment, who has access, and which risks are worth money this quarter.",
  },
  {
    title: "Protection without a security department",
    body: "You get the function of a trusted IT and cybersecurity lead — without hiring, managing, or retaining one.",
  },
  {
    title: "Calm when it counts",
    body: "Incidents are coordinated, insurers and specialists are already identified, and you are not improvising at 2 a.m.",
  },
  {
    title: "A partner who answers to you",
    body: "Advice is tailored to a family or closely held business. No upsell theater. No one-size-fits-all stack.",
  },
] as const;

export const interests = [
  { value: "assessment", label: "Assessment and roadmap" },
  { value: "managed", label: "Managed IT and cybersecurity" },
  { value: "response", label: "Incident readiness" },
  { value: "unsure", label: "Not sure — start with a conversation" },
] as const;
