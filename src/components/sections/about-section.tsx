import { Reveal } from "@/components/shared/reveal";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { aboutData } from "@/data/about";

export function AboutSection() {
  return (
    <section id="about">
      <div className="container-site section-y">
        {/* Header */}
        <Reveal>
          <div className="border-b border-foreground/8 pb-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-accent-text inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.12em] uppercase">
                  <span
                    aria-hidden="true"
                    className="bg-success h-1.5 w-1.5 rounded-full"
                  />
                  <span>[About]</span>
                </span>

                <h2 className="text-foreground mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl lg:text-[2.625rem]">
                  Understanding software as a system.
                </h2>
              </div>

              <p className="text-muted-foreground max-w-sm text-sm leading-6 md:pb-1">
                How I work, what I value, and how I approach technical
                decisions.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Content: narrative + profile.json side by side */}
        <Reveal delay={60}>
          <div className="mt-(--space-xl) grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:items-start lg:gap-16">
            {/* Left — narrative */}
            <div className="max-w-2xl">
              {aboutData.intro.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "text-muted-foreground text-base leading-7 sm:text-[17px] sm:leading-8"
                      : "text-muted-foreground mt-4 text-base leading-7 sm:text-[17px] sm:leading-8"
                  }
                >
                  {paragraph}
                </p>
              ))}

              <div className="mt-(--space-xl)">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-muted-foreground font-mono text-[10px] font-semibold tracking-[0.12em] uppercase">
                    Operating principles
                  </span>
                  <span
                    aria-hidden="true"
                    className="bg-foreground/8 h-px flex-1"
                  />
                </div>

                <ul>
                  {aboutData.principles.map((principle, index) => (
                    <li
                      key={principle}
                      className="border-foreground/8 group flex gap-4 border-b py-3.5 last:border-b-0"
                    >
                      <span className="text-muted-foreground/70 w-6 shrink-0 font-mono text-[10px] font-semibold tracking-wider">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-muted-foreground group-hover:text-foreground text-sm leading-6 transition-colors duration-150">
                        {principle}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — profile.json */}
            <aside className="border-foreground/10 bg-card/60 h-fit overflow-hidden rounded-md border">
              <div className="border-foreground/10 flex items-center justify-between gap-4 border-b px-5 py-4">
                <span className="text-muted-foreground font-mono text-[11px] font-medium tracking-widest uppercase">
                  profile.json
                </span>

                <span className="bg-success/10 text-success inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.08em] uppercase">
                  <span
                    aria-hidden
                    className="bg-success status-pulse-dot h-1.5 w-1.5 rounded-full"
                  />
                  live
                </span>
              </div>

              <dl className="px-5">
                {aboutData.statusRows.map((row) => (
                  <div
                    key={row.key}
                    className="border-foreground/8 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 border-b py-4 last:border-b-0"
                  >
                    <dt className="text-accent-text font-mono text-[10px] font-semibold tracking-[0.08em] uppercase sm:text-[11px]">
                      [{row.key}]
                    </dt>
                    <dd className="text-foreground text-right font-mono text-[11px] leading-5 sm:text-xs">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Reveal>
      </div>
      <TechStackSection />
    </section>
  );
}
