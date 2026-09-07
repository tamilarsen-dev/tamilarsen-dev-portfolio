import { cn } from "@/lib/utils";

const tickerItems = [
  {
    label: "STACK",
    value: "TypeScript · Next.js · Node.js · PostgreSQL",
  },
  {
    label: "STATUS",
    value: "Open to opportunities",
  },
  {
    label: "FOCUS",
    value: "Full-stack web development · Backend engineering",
  },
  {
    label: "BASED",
    value: "Indonesia",
  },
] as const;

export function SystemTicker() {
  return (
    <div
      aria-hidden="true"
      className="group/ticker overflow-hidden border-y border-border/80 bg-chrome/35"
    >
      <div
        className="
          animate-ticker-scroll
          flex
          w-max
          items-center
          py-2.5
          group-hover/ticker:paused
        "
      >
        <TickerSet />
        <TickerSet />
      </div>
    </div>
  );
}

function TickerSet() {
  return (
    <div className="flex shrink-0 items-center">
      {tickerItems.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center">
          <TickerItem item={item} />
          <TickerSeparator />
        </div>
      ))}
    </div>
  );
}

function TickerSeparator() {
  return (
    <span
      aria-hidden="true"
      className="
        mx-5
        font-mono
        text-[10px]
        text-foreground/20
        transition-opacity
        duration-200
        group-hover/ticker:opacity-40
      "
    >
      /
    </span>
  );
}

function TickerItem({
  item,
}: Readonly<{
  item: (typeof tickerItems)[number];
}>) {
  return (
    <span
      className={cn(
        "group/item flex shrink-0 items-center gap-2.5",
        "font-mono text-[11px] leading-none",
        "transition-transform duration-200",
        "hover:-translate-y-0.5",
      )}
    >
      <span
        aria-hidden="true"
        className="
          h-1.5
          w-1.5
          shrink-0
          rounded-full
          bg-success
          transition-transform
          duration-200
          group-hover/item:scale-125
        "
      />

      <span
        className="
          font-semibold
          tracking-[0.08em]
          text-accent-text
          transition-opacity
          duration-200
          group-hover/item:opacity-70
        "
      >
        [{item.label}]
      </span>

      <span
        className="
          text-muted-foreground
          transition-opacity
          duration-200
          group-hover/item:opacity-70
        "
      >
        {item.value}
      </span>
    </span>
  );
}
