"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-text-secondary">
        {label}
      </label>
      <input
        className={`
          w-full bg-surface-card border border-surface-border rounded-lg
          px-4 py-2.5 text-text-primary placeholder-text-muted
          focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
          transition-colors
          ${error ? "border-alert-urgent" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-alert-urgent text-xs">{error}</p>}
    </div>
  );
}
