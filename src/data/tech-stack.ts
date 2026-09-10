import type { ComponentType, SVGProps } from "react";

import {
  CplusplusIcon,
  DockerIcon,
  ExpressIcon,
  FlutterIcon,
  GitIcon,
  JavascriptIcon,
  NextjsIcon,
  NodejsIcon,
  PostgresqlIcon,
  RedisIcon,
  TypeScriptIcon,
} from "@/components/icons/tech-icons";

export type TechIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type TechItem = {
  name: string;
  Icon: TechIcon;
  color: string;
};

export type TechLayer = {
  number: string;
  category: string;
  description: string;
  items: readonly TechItem[];
};

export const techStackData = {
  label: "Technical Stack",

  title: "A system is built in layers.",

  description:
    "A technical foundation organized by responsibility, from programming and runtime to data, interfaces, and infrastructure.",

  philosophy: {
    label: "Engineering principles",

    description:
      "Prefer simple primitives, explicit boundaries, predictable data flow, and reproducible environments.",
  },

  layers: [
    {
      number: "01",
      category: "Programming Languages",
      description:
        "Languages I use across web development, general programming, and systems-oriented learning.",
      items: [
        {
          name: "TypeScript",
          Icon: TypeScriptIcon,
          color: "#3178C6",
        },
        {
          name: "JavaScript",
          Icon: JavascriptIcon,
          color: "#F7DF1E",
        },
        {
          name: "C++",
          Icon: CplusplusIcon,
          color: "#00599C",
        },
      ],
    },

    {
      number: "02",
      category: "Application Runtime",
      description:
        "Runtime and framework I use to build backend services and HTTP APIs.",
      items: [
        {
          name: "Node.js",
          Icon: NodejsIcon,
          color: "#5FA04E",
        },
        {
          name: "Express",
          Icon: ExpressIcon,
          color: "var(--foreground)",
        },
      ],
    },

    {
      number: "03",
      category: "Data Systems",
      description:
        "Database and data infrastructure used for persistent storage and application performance.",
      items: [
        {
          name: "PostgreSQL",
          Icon: PostgresqlIcon,
          color: "#4169E1",
        },
        {
          name: "Redis",
          Icon: RedisIcon,
          color: "#D82C20",
        },
      ],
    },

    {
      number: "04",
      category: "Interface Layer",
      description:
        "Technologies I use to build web interfaces and cross-platform applications.",
      items: [
        {
          name: "Next.js",
          Icon: NextjsIcon,
          color: "var(--foreground)",
        },
        {
          name: "Flutter",
          Icon: FlutterIcon,
          color: "#02569B",
        },
      ],
    },

    {
      number: "05",
      category: "Delivery & Infrastructure",
      description:
        "Tools for version control, reproducible environments, and application delivery.",
      items: [
        {
          name: "Docker",
          Icon: DockerIcon,
          color: "#2496ED",
        },
        {
          name: "Git",
          Icon: GitIcon,
          color: "#F05032",
        },
      ],
    },
  ],
} as const;
