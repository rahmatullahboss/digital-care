import { ReactNode, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  icon,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5";
  
  const variants = {
    primary: "bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500 text-white shadow-lg shadow-teal-500/40 hover:shadow-xl",
    secondary: "bg-white/70 border border-teal-200/70 text-teal-700 shadow-sm shadow-teal-200/60 hover:border-teal-400 hover:text-teal-600",
    outline: "border border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white",
    ghost: "text-teal-600 hover:bg-teal-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const buttonContent = (
    <>
      {icon && <span>{icon}</span>}
      {children}
    </>
  );

  const combinedClassName = cn(
    baseStyles, 
    variants[variant], 
    sizes[size], 
    fullWidth ? "w-full" : "",
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {buttonContent}
    </button>
  );
}
