import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageEnterProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
  tone?: "default" | "heading" | "soft";
  as?: "div" | "header" | "section" | "article" | "aside";
};

const toneClass = {
  default: "page-enter",
  heading: "page-enter-heading",
  soft: "page-enter-soft",
} as const;

export function PageEnter({
  children,
  className,
  delay = 0,
  tone = "default",
  as: Tag = "div",
  style,
  ...props
}: PageEnterProps) {
  return (
    <Tag
      className={cn(toneClass[tone], className)}
      style={
        {
          ...style,
          "--page-enter-delay": `${delay}ms`,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </Tag>
  );
}
