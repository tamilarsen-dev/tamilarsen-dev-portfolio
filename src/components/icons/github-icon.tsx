"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { cn } from "@/lib/utils";

export function GithubIcon({ className }: Readonly<{ className?: string }>) {
  const { resolvedTheme } = useTheme();
  const hasMounted = useHasMounted();
  const src =
    hasMounted && resolvedTheme === "light"
      ? "/logo/github-invertocat-black.svg"
      : "/logo/github-invertocat-white.svg";

  return (
    <Image
      src={src}
      alt="GitHub"
      width={98}
      height={96}
      className={cn("h-4 w-4 object-contain", className)} // default h-4 w-4, bukan h-full w-full
    />
  );
}
