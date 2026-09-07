"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

import { useHasMounted } from "@/hooks/use-has-mounted";
import { cn } from "@/lib/utils";

export function Logo({
  className,
}: Readonly<{
  className?: string;
}>) {
  const { resolvedTheme } = useTheme();
  const hasMounted = useHasMounted();

  const src =
    hasMounted && resolvedTheme === "light"
      ? "/logo/secondary-word-monogram-light.svg"
      : "/logo/secondary-word-monogram-dark.svg";

  return (
    <Image
      src={src}
      alt="T. Tamil Arsen"
      width={200}
      height={146}
      priority
      unoptimized
      className={cn("block h-auto w-auto shrink-0", className)}
    />
  );
}
