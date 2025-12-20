import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  variant = "light",
  hover = true,
  onClick,
}: GlassCardProps) {
  const baseStyles = "relative rounded-3xl backdrop-blur-lg overflow-visible transition-all duration-500";

  const variantStyles = {
    light: "bg-gradient-to-br from-white/90 to-slate-50/70 border border-white/60 shadow-[0_25px_55px_-30px_rgba(15,23,42,0.45)]",
    dark: "bg-gradient-to-br from-slate-900/80 to-teal-800/50 border border-slate-400/25 text-slate-200 shadow-[0_35px_60px_-35px_rgba(15,118,110,0.6)]",
  };

  const hoverStyles = hover
    ? "hover:-translate-y-2.5 hover:shadow-[0_35px_70px_-30px_rgba(15,23,42,0.45)] hover:border-slate-400/40 cursor-pointer"
    : "";

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], hoverStyles, className)}
      onClick={onClick}
    >
      {children}
      {/* Shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
