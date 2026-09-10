export const experiences = [
  {
    role: "Backend Developer Intern",
    company: "Kantor Gubernur Sumatera Utara",
    period: "Mar 2025 — Jul 2025",
    description:
      "Managed incoming and outgoing documents within the Bureau of Community Welfare. Towards the end of the internship, contributed as a Backend Developer to a document management system designed to improve the bureau’s document management process.",
    tech: ["JavaScript", "Node.js", "Express.js", "PostgreSQL"],
    type: "internship",
    scope: "Backend Engineering",
  },

  {
    role: "Front-End Developer Intern",
    company: "RSUD Dr. Pirngadi",
    period: "Aug 2024 — Dec 2024",
    description:
      "Contributed to the development of web and desktop applications, including Pirngadi Training Centre, Customer Satisfaction Survey Website, and E-Reader Desktop App. Focused on implementing application interfaces using HTML, CSS, JavaScript, and Bootstrap.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    type: "internship",
    scope: "Front-End Development",
  },

  {
    role: "Bachelor of Computer Science",
    company: "Universitas Prima Indonesia",
    period: "Sep 2022 — Aug 2026",
    description:
      "Completed a Bachelor of Computer Science degree with a GPA of 3.91/4.00, with a focus on software development and practical experience in web applications, backend services, databases, and software engineering fundamentals.",
    tech: ["Software Development", "Algorithms", "Data Structures", "OOP"],
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
