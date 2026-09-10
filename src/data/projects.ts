export const projects = [
  {
    title: "Personal Portfolio Website",
    slug: "personal-portfolio",
    featured: true,

    description:
      "A personal portfolio website built to present my professional background, experience, projects, and technical skills through a structured and responsive web interface.",

    longDescription:
      "This portfolio website was built as a personal software engineering project to present my background, experience, projects, and technical skills. The application uses Next.js, TypeScript, shadcn/ui, and Tailwind CSS, with a component-based structure and centralized data for portfolio content.",

    tech: ["Next.js", "TypeScript", "shadcn/ui", "Tailwind CSS"],

    year: "2026",

    status: "active",

    github: "https://github.com/tamilarsen-dev/tamilarsen-dev-portfolio",

    demo: "",

    images: [
      {
        src: "/projects/personal-portfolio/hero.png",
        alt: "Personal portfolio website homepage",
      },
    ],

    highlights: [
      "Built a personal portfolio website with Next.js and TypeScript",
      "Designed a structured interface for presenting experience, projects, and technical skills",
      "Used reusable components and centralized data to keep content and UI concerns organized",
    ],

    technicalNotes: [
      "Next.js is used as the primary framework for the web application, with TypeScript for type-safe development.",
      "shadcn/ui and Tailwind CSS are used to build and style reusable interface components.",
      "Portfolio content is separated into dedicated data modules to keep presentation components focused on rendering and interaction.",
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
