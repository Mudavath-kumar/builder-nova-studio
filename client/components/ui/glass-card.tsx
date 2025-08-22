import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const glassCardVariants = cva(
  "glass-card backdrop-blur-xl transition-all duration-500",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-white/20 to-white/5",
        primary:
          "bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30",
        accent: "bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30",
        neon: "bg-gradient-to-br from-neon-blue/20 to-deep-purple/5 border-neon-blue/30",
        cyber:
          "bg-gradient-to-br from-cyber-green/20 to-neon-blue/5 border-cyber-green/30",
        health:
          "bg-gradient-to-br from-health-red/10 to-success-green/5 border-health-red/20",
      },
      size: {
        sm: "p-4 rounded-2xl",
        default: "p-6 rounded-3xl",
        lg: "p-8 rounded-3xl",
        xl: "p-12 rounded-3xl",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-2 hover:shadow-glass-hover",
        glow: "hover:shadow-neon hover:scale-[1.02]",
        intense: "hover:shadow-intense hover:-translate-y-4 hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hover: "lift",
    },
  },
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
  children: React.ReactNode;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, size, hover, children, ...props }, ref) => {
    return (
      <div
        className={cn(glassCardVariants({ variant, size, hover, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);
GlassCard.displayName = "GlassCard";

export { GlassCard, glassCardVariants };
