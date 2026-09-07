export const projects = [
  {
    title: "Project One",
    slug: "project-one",
    featured: true,
    description:
      "Deskripsi singkat tentang masalah yang diselesaikan dan pendekatan teknis yang digunakan.",

    longDescription:
      "Project One adalah sistem yang dibangun untuk menyelesaikan masalah tertentu dengan fokus pada reliability, maintainability, dan clean architecture. Sistem ini dirancang dengan pemisahan tanggung jawab yang jelas antara application layer, domain logic, persistence, dan infrastructure.",

    tech: ["Node.js", "PostgreSQL", "Docker", "TypeScript", "Redis"],

    year: "2025",

    status: "active",

    github: "",
    demo: "",

    images: [
      {
        src: "/projects/project-one/hero.jpg",
        alt: "Project One main interface",
      },
      {
        src: "/projects/project-one/architecture.jpg",
        alt: "Project One system architecture",
      },
      {
        src: "/projects/project-one/detail.jpg",
        alt: "Project One detail view",
      },
    ],

    highlights: [
      "Handled X concurrent requests with stable latency",
      "Reduced response time by Y% through caching strategy",
      "Clean separation between domain and infrastructure layers",
    ],

    technicalNotes: [
      "Architecture was designed around explicit boundaries between the application, domain, persistence, and infrastructure layers.",

      "Redis was introduced for fast-access data and caching, while PostgreSQL remained the source of truth for persistent data.",

      "The application was containerized with Docker to keep development and deployment environments reproducible.",
    ],
  },

  {
    title: "Project Two",
    slug: "project-two",
    featured: true,
    description:
      "A backend system focused on reliable data processing and predictable application behavior.",

    longDescription:
      "Project Two explores a backend architecture built around predictable data flow, explicit responsibilities, and reliable persistence.",

    tech: ["TypeScript", "Redis"],

    year: "2025",

    status: "active",

    github: "",
    demo: "",

    images: [
      {
        src: "/projects/project-two/hero.jpg",
        alt: "Project Two main interface",
      },
      {
        src: "/projects/project-two/architecture.jpg",
        alt: "Project Two architecture",
      },
    ],

    highlights: [
      "Designed explicit boundaries between application components",
      "Used Redis for fast-access data",
      "Focused on predictable and maintainable backend behavior",
    ],

    technicalNotes: [
      "The system keeps application logic isolated from infrastructure concerns.",

      "Redis is used where low-latency access is more important than persistent storage.",
    ],
  },

  {
    title: "Project Three",
    slug: "project-three",
    featured: true,
    description:
      "A service-oriented backend experiment focused on API design and maintainable application structure.",

    longDescription:
      "Project Three was built as an exploration of service boundaries, API design, and maintainable backend architecture.",

    tech: ["Node.js", "Express"],

    year: "2024",

    status: "archived",

    github: "",
    demo: "",

    images: [
      {
        src: "/projects/project-three/hero.jpg",
        alt: "Project Three main interface",
      },
    ],

    highlights: [
      "Designed RESTful API boundaries",
      "Separated routing from application logic",
      "Focused on maintainable service structure",
    ],

    technicalNotes: [
      "Express was used as the HTTP layer while application responsibilities were kept outside route handlers.",

      "The project served as an exploration of clean boundaries within a small service.",
    ],
  },

  {
    title: "Project Three",
    slug: "project-three",
    featured: false,
    description:
      "A service-oriented backend experiment focused on API design and maintainable application structure.",

    longDescription:
      "Project Three was built as an exploration of service boundaries, API design, and maintainable backend architecture.",

    tech: ["Node.js", "Express"],

    year: "2024",

    status: "archived",

    github: "",
    demo: "",

    images: [
      {
        src: "/projects/project-three/hero.jpg",
        alt: "Project Three main interface",
      },
    ],

    highlights: [
      "Designed RESTful API boundaries",
      "Separated routing from application logic",
      "Focused on maintainable service structure",
    ],

    technicalNotes: [
      "Express was used as the HTTP layer while application responsibilities were kept outside route handlers.",

      "The project served as an exploration of clean boundaries within a small service.",
    ],
  },
] as const;

export type Project = (typeof projects)[number];

export const statusLabel = {
  active: "Active",
  archived: "Archived",
} as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
