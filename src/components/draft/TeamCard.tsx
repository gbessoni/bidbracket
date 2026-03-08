"use client";

import { Team } from "@/types";
import TeamLogo from "@/components/ui/TeamLogo";
import Badge from "@/components/ui/Badge";
import { REGION_BG_CLASSES } from "@/lib/constants/regions";

interface TeamCardProps {
  team: Team;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  selected?: boolean;
  showOwner?: boolean;
}

export default function TeamCard({ team, size = "md", onClick, selected, showOwner }: TeamCardProps) {
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 rounded-lg border transition-all
        ${size === "sm" ? "p-2" : size === "lg" ? "p-4" : "p-3"}
        ${selected
          ? "bg-accent/10 border-accent/40 ring-1 ring-accent/30"
          : "bg-surface-card border-surface-border"
        }
        ${isClickable ? "cursor-pointer hover:bg-surface-hover hover:border-surface-hover" : ""}
        ${team.status === "DRAFTED" ? "opacity-60" : ""}
      `}
    >
      <TeamLogo
        logoUrl={team.logoUrl}
        teamName={team.shortName}
        size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-semibold text-text-primary truncate ${size === "sm" ? "text-xs" : "text-sm"}`}>
            {team.shortName}
          </span>
          {team.isFirstFour && (
            <Badge variant="alert">FF</Badge>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-financial text-xs text-text-muted">
            #{team.seed}
          </span>
          <Badge className={REGION_BG_CLASSES[team.region]}>
            {team.region}
          </Badge>
        </div>
      </div>

      {showOwner && team.ownerId && (
        <div className="text-right">
          <span className="text-xs text-text-secondary">{team.ownerName}</span>
          <div className="font-financial text-xs text-accent">
            ${team.cost}
          </div>
        </div>
      )}

      {team.status === "DRAFTED" && !showOwner && (
        <span className="text-xs text-text-muted">Drafted</span>
      )}
    </div>
  );
}
