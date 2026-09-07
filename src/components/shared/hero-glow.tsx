// components/shared/hero-glow.tsx

export function HeroGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-1/2 -z-20 h-105 w-225 -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
    />
  );
}
