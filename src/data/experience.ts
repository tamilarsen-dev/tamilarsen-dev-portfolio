export const experiences = [
  {
    role: "Backend Software Engineer",
    company: "Company Name",
    period: "2025 — Present",
    description:
      "Describe the backend services you contributed to, the problems you worked on, and the technical decisions you made.",
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Docker"],
    type: "full-time",
    scope: "Backend Engineering",
  },
  {
    role: "Software Engineering Intern",
    company: "Company Name",
    period: "2024 — 2025",
    description:
      "Describe the features, services, or engineering tasks you contributed to and how they fit into the wider application.",
    tech: ["Node.js", "Express", "Redis"],
    type: "internship",
    scope: "Application Development",
  },
  {
    role: "Peer Tutor",
    company: "University Name",
    period: "2024 — 2025",
    description:
      "Supported students in understanding core computer science concepts and applying them to practical assignments.",
    tech: ["Algorithms", "Data Structures", "OOP"],
    type: "education",
    scope: "Computer Science",
  },
] as const;

export const experienceTypeLabel = {
  "full-time": "Full-time",
  internship: "Internship",
  contract: "Contract",
  education: "Education",
} as const;
