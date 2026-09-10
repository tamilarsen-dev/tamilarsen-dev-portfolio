"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons/github-icon";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";

import { Reveal } from "@/components/shared/reveal";

import { siteConfig } from "@/data/site";
import { contactData } from "@/data/contact";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const email = siteConfig.social.email.value;

  const socialIcons = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
  } as const;

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copied]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact">
      <div className="container-site section-y">
        {/* Header */}
        <Reveal>
          <div className="border-b border-foreground/8 pb-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-text">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-success"
                  />
                  <span>[CONTACT]</span>
                </span>

                <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                  Open a connection.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-muted-foreground md:pb-1">
                For software engineering opportunities, technical discussions,
                and collaboration on web projects.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Connection system */}
        <Reveal delay={60}>
          <div className="mt-8 overflow-hidden rounded-lg border border-foreground/10 bg-card/40">
            {/* System header */}
            <div className="flex min-w-0 items-center justify-between gap-3 border-b border-foreground/10 px-4 py-3.5 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  connection.endpoint
                </span>

                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-foreground/15"
                />

                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-foreground-subtle">
                  /contact
                </span>
              </div>

              <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-success">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-success"
                />
                available
              </span>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
              {/* Primary endpoint */}
              <div className="border-b border-foreground/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="max-w-2xl">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-text">
                    Primary endpoint
                  </span>

                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    Software engineering, full-stack development, and backend
                    systems.
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                    I’m open to software engineering opportunities, particularly
                    in full-stack web development and backend engineering. I’m
                    also open to technical discussions and software projects
                    where I can contribute while continuing to grow as an
                    engineer. Email is the best way to reach me.
                  </p>

                  {/* Email endpoint */}
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href={`mailto:${email}`}
                      className="group flex w-full min-w-0 items-center gap-3 rounded-md border border-foreground/10 bg-background/40 px-3 py-3 transition-[border-color,background-color,transform] duration-150 hover:border-primary/30 hover:bg-background/70 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
                    >
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-foreground/10 text-muted-foreground transition-[border-color,color] duration-150 group-hover:border-primary/30 group-hover:text-accent-text"
                      >
                        <Mail size={16} />
                      </span>

                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium tracking-tight text-foreground transition-colors duration-150 group-hover:text-accent-text sm:text-base">
                          {email}
                        </span>

                        <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
                          send email
                        </span>
                      </span>

                      <ArrowUpRight
                        aria-hidden="true"
                        size={15}
                        className="ml-auto shrink-0 text-muted-foreground transition-[transform,color] duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                      />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-live="polite"
                      className="group inline-flex w-fit items-center gap-2 rounded-md px-2 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-muted-foreground transition-[background-color,color,transform] duration-150 hover:bg-foreground/5 hover:text-foreground active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span
                        aria-hidden="true"
                        className="relative flex h-4 w-4 items-center justify-center"
                      >
                        <Copy
                          size={13}
                          className={[
                            "absolute transition-[transform,opacity] duration-150",
                            copied
                              ? "scale-75 rotate-45 opacity-0"
                              : "scale-100 rotate-0 opacity-100",
                          ].join(" ")}
                        />

                        <Check
                          size={13}
                          className={[
                            "absolute text-success transition-[transform,opacity] duration-150",
                            copied
                              ? "scale-100 rotate-0 opacity-100"
                              : "scale-75 -rotate-45 opacity-0",
                          ].join(" ")}
                        />
                      </span>

                      <span className={copied ? "text-success" : undefined}>
                        {copied ? "Copied" : "Copy address"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* System metadata */}
              <aside className="bg-background/20 p-6 sm:p-8">
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Connection context
                  </span>

                  <ul className="mt-4 space-y-3">
                    {contactData.connectionContext.map((item, index) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-xs text-foreground"
                      >
                        <span className="font-mono text-[9px] text-accent-text">
                          0{index + 1}
                        </span>

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-foreground/8 pt-5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Availability
                  </span>

                  <div className="mt-2 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-success"
                    />

                    <span className="font-mono text-[11px] text-foreground">
                      {contactData.availability}
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-foreground/8 pt-5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Preferred contact
                  </span>

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {contactData.preferredProtocol}
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </Reveal>

        {/* External endpoints */}
        <Reveal delay={100}>
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-4">
              <span className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                External endpoints
              </span>

              <div aria-hidden="true" className="h-px flex-1 bg-foreground/8" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {contactData.externalEndpoints.map((endpoint) => {
                const social = siteConfig.social[endpoint.social];
                const Icon = socialIcons[endpoint.social];

                return (
                  <a
                    key={endpoint.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-22 items-center justify-between rounded-md border border-foreground/10 bg-card/30 px-5 py-4 transition-[background-color,border-color,transform] duration-150 hover:-translate-y-px hover:border-foreground/20 hover:bg-card/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0"
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-foreground/10 bg-background/40 transition-[border-color,background-color] duration-150 group-hover:border-foreground/15 group-hover:bg-background/70">
                        <Icon
                          aria-hidden="true"
                          className="h-4 w-4 opacity-70 transition-[opacity,transform] duration-150 group-hover:scale-110 group-hover:opacity-100"
                        />
                      </span>

                      <span className="min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-accent-text">
                            [{endpoint.key}]
                          </span>

                          <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-foreground-subtle">
                            {social.label}
                          </span>
                        </span>

                        <span className="mt-1.5 block truncate text-sm font-medium text-foreground transition-colors duration-150 group-hover:text-accent-text">
                          {social.value}
                        </span>
                      </span>
                    </span>

                    <ArrowUpRight
                      aria-hidden="true"
                      size={16}
                      className="ml-4 shrink-0 text-muted-foreground transition-[transform,color] duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Closing system statement */}
        <Reveal delay={130}>
          <div className="mt-8 flex flex-col gap-3 border-t border-foreground/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Connection state
            </span>

            <p className="max-w-xl text-xs leading-5 text-muted-foreground sm:text-right">
              {contactData.closingStatement}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
