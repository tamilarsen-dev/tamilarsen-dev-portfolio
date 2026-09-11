import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { AmbientGrid } from "@/components/shared/ambient-grid";
import { Footer } from "@/components/layout/footer";
import { HeroGlow } from "@/components/shared/hero-glow";
import { ContextMenu } from "@/components/shared/context-menu";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { siteConfig } from "@/data/site";

import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: siteConfig.assets.favicon,
    shortcut: siteConfig.assets.favicon,
    apple: siteConfig.assets.favicon,
  },

  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,

    // images: [
    //   {
    //     url: siteConfig.assets.ogImage,
    //     width: 1200,
    //     height: 630,
    //     alt: `${siteConfig.name} - ${siteConfig.title}`,
    //   },
    // ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#f5f4f2",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#141414",
    },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author.name,
  jobTitle: siteConfig.author.jobTitle,
  url: siteConfig.url,
  sameAs: [siteConfig.social.github.href, siteConfig.social.linkedin.href],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative flex min-h-screen flex-col overflow-x-clip">
            {/* Structured data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(personJsonLd),
              }}
            />

            {/* Decorative layers */}
            <HeroGlow />
            <AmbientGrid />

            {/* Global scroll feedback */}
            <ScrollProgress />

            {/* Navigation */}
            <Navbar />

            {/* Main content */}
            <main id="main-content" className="relative flex-1">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </div>
          <ContextMenu />
        </ThemeProvider>
      </body>
    </html>
  );
}
