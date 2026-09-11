type NavigationItem = {
  id: string;
  label: string;
  href: `#${string}`;
  route?: `/${string}`;
};

export const siteConfig = {
  name: "T. Tamil Arsen",
  shortName: "Arsen",

  title: "Software Engineer",

  description:
    "Portfolio of T. Tamil Arsen, a Computer Science graduate focused on full-stack web development, with a particular interest in backend engineering and software systems.",

  url: "https://tamilarsen-dev-portfolio.vercel.app",

  locale: "en_US",

  author: {
    name: "T. Tamil Arsen",
    jobTitle: "Software Engineer",
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
    // instagram: {
    //   href: "https://www.instagram.com/your-instagram",
    //   label: "Instagram",
    // },
    // twitter: {
    //   href: "https://twitter.com/your-twitter",
    //   label: "Twitter",
    // },
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
    // ogImage: "/og-image.png",
    resume: "/resume/T_Tamil_Arsen_Resume.pdf",
  },
} as const;
