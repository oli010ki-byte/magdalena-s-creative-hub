import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:     "bg-[#1C1610] text-[#F2E9DC] hover:bg-[#2e261c] active:scale-[0.97]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:     "border border-[#1C1610]/20 bg-transparent text-[#1C1610]/70 hover:border-[#1C1610]/40 hover:text-[#1C1610] active:scale-[0.97]",
        secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:       "hover:bg-[#1C1610]/06 text-[#1C1610]/70 hover:text-[#1C1610]",
        link:        "text-primary underline-offset-4 hover:underline",
        gold:        "bg-[#1C1610] text-[#F2E9DC] hover:bg-[#2e261c] active:scale-[0.97]",
        warm:        "bg-cream text-warm-brown border border-border hover:bg-secondary hover:border-primary/20",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm:      "h-9 px-5 text-xs",
        lg:      "h-12 px-8 text-base",
        xl:      "h-14 px-10 text-lg",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
