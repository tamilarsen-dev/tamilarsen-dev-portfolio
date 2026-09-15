"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <span className="relative block h-auto w-auto shrink-0">
      <Image
        src="/logo/secondary-word-monogram-dark.svg"
        alt="T. Tamil Arsen"
        width={200}
        height={146}
        priority
        unoptimized
        className={cn(
          "block h-auto w-auto transition-opacity duration-200",
          "dark:opacity-100",
          "opacity-0",
          className,
        )}
      />

      <Image
        src="/logo/secondary-word-monogram-light.svg"
        alt=""
        aria-hidden="true"
        width={200}
        height={146}
        priority
        unoptimized
        className={cn(
          "absolute inset-0 h-auto w-auto transition-opacity duration-200",
          "opacity-100 dark:opacity-0",
          className,
        )}
      />
    </span>
  );
}
