import type { Metadata } from "next";

import { siteConfig } from "@/data/site";

import { HomeSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { WritingSection } from "@/components/sections/writing-section";
import { HashScroll } from "@/components/shared/hash-scroll";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: siteConfig.url,
  },
};

export default function Home() {
  return (
    <>
      <HashScroll />
      <HomeSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <WritingSection />
      <ContactSection />
    </>
  );
}
