"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

import { usePathname } from "next/navigation";

type ScrollLinkProps = {
  href: string;
  children?: ReactNode;
  className?: string;
  onNavigate?: () => void;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function ScrollLink({
  href,
  children,
  className,
  onNavigate,
  onClick,
  ...props
}: ScrollLinkProps) {
  const pathname = usePathname();

  /*
   * Internal route / internal homepage hash.
   *
   * Examples:
   *
   * /projects
   * /writing
   * /#projects
   * /#writing
   *
   * These should use Next client navigation,
   * NOT a native <a> navigation.
   *
   * This prevents the global navbar from booting again
   * during route changes.
   */
  const isInternalRoute = href.startsWith("/") && !href.startsWith("//");

  if (isInternalRoute) {
    return (
      <Link
        href={href}
        className={className}
        onClick={(event) => {
          onClick?.(event);

          if (event.defaultPrevented) {
            return;
          }

          onNavigate?.();
        }}
        {...props}
      >
        {children}
      </Link>
    );
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    /*
     * Only plain hash links reach this branch.
     *
     * Example:
     *
     * #about
     * #projects
     * #writing
     */
    if (!href.startsWith("#")) {
      onNavigate?.();
      return;
    }

    /*
     * Hash link from a non-home route.
     *
     * This is intentionally handled by the navbar as
     * /#section instead of #section.
     *
     * So this branch should normally only run on homepage.
     */
    if (pathname !== "/") {
      onNavigate?.();
      return;
    }

    const id = href.slice(1);
    const element = document.getElementById(id);

    if (!element) {
      onNavigate?.();
      return;
    }

    event.preventDefault();

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    /*
     * Home is the actual document starting point.
     */
    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: reduce ? "auto" : "smooth",
      });

      window.history.replaceState(null, "", "#home");

      onNavigate?.();

      return;
    }

    /*
     * Other homepage sections.
     */
    element.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", href);

    onNavigate?.();
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
