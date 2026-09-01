export const site = {
  legalName: "Hacked0ff Cybersecurity",
  shortName: "Hacked0ff",
  email: "info@hacked0ff.com",
  tagline:
    "When business is personal, you need a cybersecurity professional you can trust.",
  positioning:
    "Practical cybersecurity for family businesses, closely held companies, and high-net-worth households. No theater. No enterprise sales process. We keep hackers off your business so you can run it.",
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
    value: "$4.88M",
    label: "Average cost of a data breach in 2024",
    source: "IBM Cost of a Data Breach Report, 2024",
  },
  {
    value: "73%",
    label: "of small-business owners reported a breach or attack in the prior year",
    source: "Fortra Business Impact Report, 2023",
  },
  {
    value: "85%",
    label: "of ransomware attacks targeted small and midsize businesses",
    source: "Veeam, Small Business Ransomware, 2023",
  },
  {
    value: "194 days",
    label: "average time to even identify a breach — then 64 more to contain it",
    source: "IBM Cost of a Data Breach Report, 2024",
  },
] as const;

export const supportingFacts = [
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
] as const;

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
