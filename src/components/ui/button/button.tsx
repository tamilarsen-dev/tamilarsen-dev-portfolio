import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button",
    "inline-flex",
    "shrink-0",
    "items-center",
    "justify-center",
    "whitespace-nowrap",
    "select-none",
    "border",
    "border-transparent",
    "bg-clip-padding",
    "font-medium",
    "outline-none",

    // Interaction
    "transition-[background-color,border-color,color,transform,box-shadow]",
    "duration-150",
    "ease-out",
    "will-change-auto",

    // Focus
    "focus-visible:border-ring",
    "focus-visible:ring-2",
    "focus-visible:ring-ring/30",

    // Pressed
    "active:not-aria-[haspopup]:translate-y-px",

    // Disabled
    "disabled:pointer-events-none",
    "disabled:opacity-50",

    // Invalid
    "aria-invalid:border-destructive",
    "aria-invalid:ring-2",
    "aria-invalid:ring-destructive/20",
    "dark:aria-invalid:border-destructive/50",
    "dark:aria-invalid:ring-destructive/30",

    // SVG
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary",
          "text-primary-foreground",
          "hover:bg-primary-hover",
          "focus-visible:bg-primary-hover",
        ].join(" "),

        outline: [
          "border-border",
          "bg-background",
          "text-foreground",
          "hover:bg-muted",
          "hover:text-foreground",
          "hover:border-foreground/15",
          "aria-expanded:bg-muted",
          "aria-expanded:text-foreground",
          "dark:border-input",
          "dark:bg-input/30",
          "dark:hover:bg-input/50",
          "dark:hover:border-foreground/20",
        ].join(" "),

        secondary: [
          "bg-secondary",
          "text-secondary-foreground",
          "hover:bg-secondary/80",
          "hover:border-foreground/5",
          "aria-expanded:bg-secondary",
          "aria-expanded:text-secondary-foreground",
        ].join(" "),

        ghost: [
          "text-muted-foreground",
          "hover:bg-muted",
          "hover:text-foreground",
          "aria-expanded:bg-muted",
          "aria-expanded:text-foreground",
          "dark:hover:bg-muted/50",
        ].join(" "),

        destructive: [
          "bg-destructive/10",
          "text-destructive",
          "hover:bg-destructive/20",
          "hover:border-destructive/20",
          "focus-visible:border-destructive/40",
          "focus-visible:ring-destructive/20",
          "dark:bg-destructive/20",
          "dark:hover:bg-destructive/30",
          "dark:focus-visible:ring-destructive/40",
        ].join(" "),

        link: ["text-primary", "underline-offset-4", "hover:underline"].join(
          " ",
        ),
      },

      size: {
        default: [
          "h-8",
          "gap-1.5",
          "rounded-md",
          "px-2.5",
          "text-sm",
          "has-data-[icon=inline-end]:pr-2",
          "has-data-[icon=inline-start]:pl-2",
        ].join(" "),

        xs: [
          "h-6",
          "gap-1",
          "rounded-sm",
          "px-2",
          "text-xs",
          "in-data-[slot=button-group]:rounded-md",
          "has-data-[icon=inline-end]:pr-1.5",
          "has-data-[icon=inline-start]:pl-1.5",
          "[&_svg:not([class*='size-'])]:size-3",
        ].join(" "),

        sm: [
          "h-8",
          "gap-1.5",
          "rounded-md",
          "px-2.5",
          "text-xs",
          "in-data-[slot=button-group]:rounded-md",
          "has-data-[icon=inline-end]:pr-2",
          "has-data-[icon=inline-start]:pl-2",
          "[&_svg:not([class*='size-'])]:size-3.5",
        ].join(" "),

        lg: [
          "h-10",
          "gap-2",
          "rounded-md",
          "px-4",
          "text-sm",
          "has-data-[icon=inline-end]:pr-3.5",
          "has-data-[icon=inline-start]:pl-3.5",
        ].join(" "),

        xl: [
          "h-11",
          "gap-2",
          "rounded-md",
          "px-5",
          "text-base",
          "has-data-[icon=inline-end]:pr-4.5",
          "has-data-[icon=inline-start]:pl-4.5",
          "[&_svg:not([class*='size-'])]:size-5",
        ].join(" "),

        icon: "size-8 rounded-md",

        "icon-xs": [
          "size-6",
          "rounded-sm",
          "in-data-[slot=button-group]:rounded-md",
          "[&_svg:not([class*='size-'])]:size-3",
        ].join(" "),

        "icon-sm": [
          "size-7",
          "rounded-md",
          "in-data-[slot=button-group]:rounded-md",
        ].join(" "),

        "icon-lg": ["size-9", "rounded-md"].join(" "),
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
