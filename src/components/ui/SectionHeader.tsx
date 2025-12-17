import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  kicker?: string;
  kickerIcon?: ReactNode;
  title: string;
  description?: string;
  variant?: "light" | "dark";
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  kicker,
  kickerIcon,
  title,
  description,
  variant = "light",
  centered = true,
  className,
}: SectionHeaderProps) {
  const kickerStyles = {
    light: "bg-white/70 border-slate-200/70 text-teal-700 shadow-teal-100/40",
    dark: "bg-slate-900/45 border-slate-400/30 text-teal-100 shadow-teal-500/20",
  };

  const titleStyles = {
    light: "text-slate-900",
    dark: "text-white",
  };

  const descStyles = {
    light: "text-slate-600",
    dark: "text-slate-200/90",
  };

  return (
    <div className={cn("space-y-4 max-w-3xl", centered && "mx-auto text-center", className)}>
      {kicker && (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] border shadow-sm backdrop-blur",
            kickerStyles[variant]
          )}
        >
          {kickerIcon}
          {kicker}
        </span>
      )}
      <h2 className={cn("text-3xl md:text-4xl font-bold", titleStyles[variant])}>{title}</h2>
      {description && (
        <p className={cn("text-lg leading-relaxed", descStyles[variant])}>{description}</p>
      )}
    </div>
  );
}
