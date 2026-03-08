"use client";

import { useState } from "react";

interface TeamLogoProps {
  logoUrl: string;
  teamName: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

export default function TeamLogo({ logoUrl, teamName, size = "md", className = "" }: TeamLogoProps) {
  const [error, setError] = useState(false);

  const initials = teamName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  if (error) {
    return (
      <div
        className={`
          ${sizes[size]} rounded-full bg-surface-hover
          flex items-center justify-center text-text-muted font-bold
          ${size === "sm" ? "text-[8px]" : size === "md" ? "text-[10px]" : "text-xs"}
          ${className}
        `}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={teamName}
      className={`${sizes[size]} object-contain ${className}`}
      onError={() => setError(true)}
    />
  );
}
