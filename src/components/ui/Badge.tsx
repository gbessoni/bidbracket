import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "alert" | "region";
  className?: string;
}

const variants = {
  default: "bg-surface-hover text-text-secondary",
  accent: "bg-accent/20 text-accent-light",
  alert: "bg-alert/20 text-alert",
  region: "",
};

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
