type NavigationItem = {
  id: string;
  label: string;
  href: `#${string}`;
  route?: `/${string}`;
};

export const siteConfig = {
  name: "T. Tamil Arsen",
  shortName: "Arsen",

  title: "Full-Stack Software Engineer",

  description:
    "Portfolio of T. Tamil Arsen, a Computer Science graduate focused on full-stack web development, with a strong interest in backend engineering and software systems.",

  url: "https://tamilarsen.dev",

  locale: "en_US",

  author: {
    name: "T. Tamil Arsen",
    jobTitle: "Full-Stack Software Engineer",
  },

  social: {
    github: {
      href: "https://github.com/tamilarsen-dev",
      label: "GitHub",
      value: "github.com/tamilarsen-dev",
    },
    linkedin: {
      href: "https://linkedin.com/in/tamilarsen-dev",
      label: "LinkedIn",
      value: "linkedin.com/in/tamilarsen-dev",
    },
    email: {
      href: "mailto:TamilArsen88@gmail.com",
      label: "Email",
      value: "TamilArsen88@gmail.com",
    },
  },

  navigation: [
    {
      id: "home",
      label: "Home",
      href: "#home",
    },
    {
      id: "about",
      label: "About",
      href: "#about",
    },
    {
      id: "experience",
      label: "Experience",
      href: "#experience",
    },
    {
      id: "projects",
      label: "Projects",
      href: "#projects",
      route: "/projects",
    },
    {
      id: "writing",
      label: "Writing",
      href: "#writing",
      route: "/writing",
    },
    {
      id: "contact",
      label: "Contact",
      href: "#contact",
    },
  ] satisfies readonly NavigationItem[],

  assets: {
    favicon: "/favicon.svg",
    ogImage: "/og-image.png",
    resume: "/resume.pdf",
  },
} as const;
