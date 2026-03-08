"use client";

interface TimerProps {
  secondsLeft: number;
  progress: number;
  isUrgent: boolean;
}

export default function Timer({ secondsLeft, progress, isUrgent }: TimerProps) {
  const colorClass = isUrgent
    ? "text-alert-urgent"
    : secondsLeft <= 10
    ? "text-alert"
    : "text-accent";

  const barColorClass = isUrgent
    ? "bg-alert-urgent"
    : secondsLeft <= 10
    ? "bg-alert"
    : "bg-accent";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center">
        <span
          className={`
            font-financial text-4xl font-bold ${colorClass}
            ${isUrgent ? "animate-pulse-glow" : ""}
          `}
        >
          {secondsLeft}s
        </span>
      </div>
      <div className="w-full h-2 bg-surface-hover rounded-full overflow-hidden">
        <div
          className={`h-full ${barColorClass} rounded-full transition-all duration-100`}
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
