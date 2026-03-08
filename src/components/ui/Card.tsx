import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export default function Card({ children, className = "", glow }: CardProps) {
  return (
    <div
      className={`
        bg-surface-card border border-surface-border rounded-xl p-4
        ${glow ? "ring-1 ring-accent/30 shadow-lg shadow-accent/5" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
