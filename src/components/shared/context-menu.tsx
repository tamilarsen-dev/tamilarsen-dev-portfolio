// components/shared/context-menu.tsx
"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Download, Mail, ArrowUp, ArrowLeft, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

import { GithubIcon } from "@/components/icons/github-icon";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type MenuState = {
  open: boolean;
  x: number;
  y: number;
};

type MenuItem = {
  id: string;
  label: string;
  hint?: string;
  hintVariant?: "badge" | "muted";
  icon: ReactNode;
  onClick: () => void;
};

export function ContextMenu() {
  const router = useRouter();
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [menu, setMenu] = useState<MenuState>({
    open: false,
    x: 0,
    y: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const close = useCallback(() => {
    setMenu((m) => (m.open ? { ...m, open: false } : m));
  }, []);

  const connectItems: MenuItem[] = [
    {
      id: "resume",
      label: "Download Resume",
      hint: "PDF",
      hintVariant: "badge",
      icon: <Download size={15} className="text-muted-foreground shrink-0" />,
      onClick: () => {
        const a = document.createElement("a");
        a.href = siteConfig.assets.resume;
        a.download = "";
        a.click();
      },
    },
    {
      id: "github",
      label: "GitHub",
      icon: <GithubIcon className="h-3.75 w-3.75 shrink-0 opacity-80" />,
      onClick: () =>
        window.open(
          siteConfig.social.github.href,
          "_blank",
          "noopener,noreferrer",
        ),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <LinkedinIcon className="h-3.75 w-3.75 shrink-0 opacity-80" />,
      onClick: () =>
        window.open(
          siteConfig.social.linkedin.href,
          "_blank",
          "noopener,noreferrer",
        ),
    },
    {
      id: "email",
      label: "Send Email",
      icon: <Mail size={15} className="text-muted-foreground shrink-0" />,
      onClick: () => {
        window.location.assign(siteConfig.social.email.href);
      },
    },
  ];

  const pageItems: MenuItem[] = [
    {
      id: "top",
      label: "Scroll to Top",
      hint: "Home",
      hintVariant: "muted",
      icon: <ArrowUp size={15} className="text-muted-foreground shrink-0" />,
      onClick: () => {
        if (window.location.pathname === "/") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.replaceState(null, "", "#home");
        } else {
          router.push("/#home");
        }
      },
    },
    {
      id: "back",
      label: "Go Back",
      hint: "Alt+←",
      hintVariant: "muted",
      icon: <ArrowLeft size={15} className="text-muted-foreground shrink-0" />,
      onClick: () => router.back(),
    },
    {
      id: "refresh",
      label: "Refresh",
      hint: "F5",
      hintVariant: "muted",
      icon: <RefreshCw size={15} className="text-muted-foreground shrink-0" />,
      onClick: () => window.location.reload(),
    },
  ];

  const allItems = [...connectItems, ...pageItems];

  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          "input, textarea, select, [contenteditable=true], [data-no-context-menu]",
        )
      ) {
        return;
      }

      e.preventDefault();

      const menuWidth = 240;
      const menuHeight = 320;
      const pad = 8;

      let x = e.clientX;
      let y = e.clientY;

      if (x + menuWidth > window.innerWidth - pad) {
        x = window.innerWidth - menuWidth - pad;
      }
      if (y + menuHeight > window.innerHeight - pad) {
        y = window.innerHeight - menuHeight - pad;
      }

      setActiveIndex(0);
      setMenu({ open: true, x, y });
    };

    const onPointerDown = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target as Node)) return;
      close();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("scroll", close, true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", close);

    return () => {
      window.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", close);
    };
  }, [close]);

  // Focus first item when opened
  useEffect(() => {
    if (!menu.open) return;

    const id = window.requestAnimationFrame(() => {
      itemRefs.current[0]?.focus();
    });

    return () => window.cancelAnimationFrame(id);
  }, [menu.open]);

  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const count = allItems.length;
    if (count === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (activeIndex + 1) % count;
      setActiveIndex(next);
      itemRefs.current[next]?.focus();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = (activeIndex - 1 + count) % count;
      setActiveIndex(next);
      itemRefs.current[next]?.focus();
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
      itemRefs.current[0]?.focus();
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      const last = count - 1;
      setActiveIndex(last);
      itemRefs.current[last]?.focus();
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  const runItem = (item: MenuItem) => {
    close();
    item.onClick();
  };

  if (!menu.open) return null;

  const renderItem = (item: MenuItem, index: number) => (
    <button
      key={item.id}
      ref={(el) => {
        itemRefs.current[index] = el;
      }}
      type="button"
      role="menuitem"
      tabIndex={activeIndex === index ? 0 : -1}
      onClick={() => runItem(item)}
      onMouseEnter={() => setActiveIndex(index)}
      className={cn(
        "text-foreground/90 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
        "hover:bg-foreground/8 focus:bg-foreground/8 focus:outline-none",
      )}
    >
      {item.icon}
      <span className="flex-1">{item.label}</span>
      {item.hint && (
        <span
          className={cn(
            "font-mono text-[10px]",
            item.hintVariant === "badge"
              ? "bg-primary/15 text-accent-text rounded px-1.5 py-0.5 font-semibold"
              : "text-muted-foreground/50",
          )}
        >
          {item.hint}
        </span>
      )}
    </button>
  );

  return (
    <div
      ref={menuRef}
      id={menuId}
      role="menu"
      aria-label="Site actions"
      tabIndex={-1}
      onKeyDown={onMenuKeyDown}
      className={cn(
        "border-border bg-chrome/95 fixed z-100 min-w-55 overflow-hidden rounded-xl border p-1.5 shadow-xl backdrop-blur-md",
        "animate-in fade-in-0 zoom-in-95 duration-150",
      )}
      style={{ left: menu.x, top: menu.y }}
    >
      <p className="text-muted-foreground/60 px-2.5 pt-1.5 pb-1 font-mono text-[10px] font-semibold tracking-wider uppercase">
        Connect
      </p>
      {connectItems.map((item, i) => renderItem(item, i))}

      <hr className="border-foreground/10 my-1.5 border-0 border-t" />

      <p className="text-muted-foreground/60 px-2.5 pt-0.5 pb-1 font-mono text-[10px] font-semibold tracking-wider uppercase">
        Page
      </p>
      {pageItems.map((item, i) => renderItem(item, connectItems.length + i))}
    </div>
  );
}
