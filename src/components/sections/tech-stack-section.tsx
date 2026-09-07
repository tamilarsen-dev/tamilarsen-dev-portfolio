"use client";

import { useState, type CSSProperties } from "react";

import { Reveal } from "@/components/shared/reveal";
import { techStackData, type TechItem } from "@/data/tech-stack";
import { cn } from "@/lib/utils";

function SystemNode({
  name,
  Icon,
  color,
  active,
  onSelect,
}: TechItem & {
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      style={{ "--brand": color } as CSSProperties}
      className={cn(
        "group relative flex w-full items-center gap-3 overflow-hidden",
        "rounded-lg border border-foreground/10 bg-background/40 px-3 py-3 text-left",
        "transition-[transform,border-color,background-color,box-shadow] duration-250",
        "hover:border-(--brand)/35 hover:bg-card/70",
        "hover:shadow-[0_0_20px_-12px_var(--brand)]",
        active &&
          "border-(--brand)/40 bg-card/80 shadow-[0_0_20px_-12px_var(--brand)]",
      )}
    >
      {/* Soft brand wash */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100",
          active && "opacity-100",
        )}
        style={{
          background: `radial-gradient(circle at 8% 50%, color-mix(in oklab, ${color} 12%, transparent), transparent 65%)`,
        }}
      />

      {/* Icon cell */}
      <div
        className={cn(
          "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-transform duration-250",
          "group-hover:scale-[1.03]",
          active && "scale-[1.03]",
        )}
        style={{
          borderColor: `color-mix(in oklab, ${color} 22%, transparent)`,
          backgroundColor: `color-mix(in oklab, ${color} 6%, var(--background))`,
        }}
      >
        <Icon
          aria-hidden
          className="relative h-4.5 w-4.5"
          style={{ color }}
        />
      </div>

      <span className="relative text-sm font-medium tracking-tight text-foreground">
        {name}
      </span>

      {/* Status dot */}
      <span
        aria-hidden
        className={cn(
          "relative ml-auto h-1.5 w-1.5 rounded-full opacity-25 transition-opacity duration-250",
          "group-hover:opacity-100",
          active && "opacity-100",
        )}
        style={{
          backgroundColor: color,
          boxShadow: active || undefined ? `0 0 8px ${color}` : undefined,
        }}
      />
    </button>
  );
}

function SystemLayer({
  number,
  category,
  description,
  items,
  activeName,
  onSelectNode,
}: (typeof techStackData.layers)[number] & {
  activeName: string | null;
  onSelectNode: (name: string) => void;
}) {
  const layerActive = items.some((item) => item.name === activeName);

  return (
    <section className="group relative" data-active={layerActive || undefined}>
      {/* Vertical rail — desktop, subtle */}
      <div
        aria-hidden
        className="absolute top-12 bottom-0 left-4.25 hidden w-px bg-foreground/8 lg:block"
      />

      <div className="grid gap-6 lg:grid-cols-[3.5rem_minmax(12rem,0.8fr)_minmax(0,1.5fr)] lg:items-start lg:gap-8">
        <div
          className={cn(
            "relative z-10 flex h-9 w-9 items-center justify-center rounded-md border border-foreground/10 bg-background",
            "font-mono text-[10px] font-semibold tracking-wider text-muted-foreground",
            "transition-[border-color,color,box-shadow] duration-250",
            "group-hover:border-foreground/20 group-hover:text-accent-text",
            layerActive &&
              "border-accent/35 text-accent-text shadow-[0_0_16px_-10px_currentColor]",
          )}
        >
          {number}
        </div>

        <div className="pt-0.5">
          <h3 className="text-foreground text-sm font-semibold tracking-tight">
            {category}
          </h3>
          <p className="text-muted-foreground mt-1.5 max-w-xs text-xs leading-5">
            {description}
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <SystemNode
              key={item.name}
              {...item}
              active={activeName === item.name}
              onSelect={() => onSelectNode(item.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechStackSection() {
  const [activeName, setActiveName] = useState<string | null>(null);

  return (
    <section id="tech-stack">
      <div className="container-site section-y">
        <Reveal>
          <div className="border-b border-foreground/8 pb-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-accent-text inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.12em] uppercase">
                  <span
                    aria-hidden
                    className="bg-success h-1.5 w-1.5 rounded-full"
                  />
                  [{techStackData.label}]
                </span>
                <h2 className="text-foreground mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
                  {techStackData.title}
                </h2>
              </div>
              <p className="text-muted-foreground max-w-md text-sm leading-6 md:pb-1">
                {techStackData.description}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={70}>
          <div className="relative mt-(--space-xl)">
            {techStackData.layers.map((layer, index) => (
              <div key={layer.number}>
                <SystemLayer
                  {...layer}
                  activeName={activeName}
                  onSelectNode={(name) =>
                    setActiveName((prev) => (prev === name ? null : name))
                  }
                />
                {index < techStackData.layers.length - 1 && (
                  <div
                    aria-hidden
                    className="bg-foreground/6 my-(--space-xl) ml-0 h-px lg:ml-14"
                  />
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="border-foreground/8 mt-8 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-muted-foreground font-mono text-[10px] font-semibold tracking-[0.12em] uppercase">
              {techStackData.philosophy.label}
            </span>
            <p className="text-muted-foreground max-w-xl text-xs leading-5 sm:text-right">
              {techStackData.philosophy.description}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
