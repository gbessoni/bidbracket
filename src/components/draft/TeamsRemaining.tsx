"use client";

import { useState, useMemo } from "react";
import { Team, Region } from "@/types";
import { REGIONS, REGION_BG_CLASSES } from "@/lib/constants/regions";
import TeamCard from "./TeamCard";

interface TeamsRemainingProps {
  teams: Team[];
}

export default function TeamsRemaining({ teams }: TeamsRemainingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [regionFilter, setRegionFilter] = useState<Region>(REGIONS[0]);

  const availableTeams = useMemo(
    () =>
      teams
        .filter((t) => t.status === "AVAILABLE" && t.region === regionFilter)
        .sort((a, b) => a.seed - b.seed),
    [teams, regionFilter]
  );

  const totalLeft = useMemo(
    () => teams.filter((t) => t.status === "AVAILABLE").length,
    [teams]
  );

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    REGIONS.forEach((r) => (counts[r] = 0));
    teams.forEach((t) => {
      if (t.status === "AVAILABLE") {
        counts[t.region]++;
      }
    });
    return counts;
  }, [teams]);

  return (
    <div className="mt-4 border-t border-surface-border pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-text-primary">
            Teams Remaining
          </span>
          <span className="bg-accent/15 text-accent text-xs font-financial font-bold px-2 py-0.5 rounded-full">
            {totalLeft}
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-3 space-y-3">
          {/* Region Buttons */}
          <div className="flex gap-2">
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setRegionFilter(region)}
                className={`
                  flex-1 px-2 py-2 rounded-lg text-sm font-semibold transition-all
                  ${regionFilter === region
                    ? `${REGION_BG_CLASSES[region]} ring-1 ring-current shadow-lg`
                    : "bg-surface-hover text-text-secondary hover:bg-surface-border"
                  }
                `}
              >
                {region} <span className="font-financial text-xs ml-1">({regionCounts[region]})</span>
              </button>
            ))}
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
            {availableTeams.map((team) => (
              <TeamCard key={team.id} team={team} size="sm" />
            ))}
          </div>

          {availableTeams.length === 0 && (
            <p className="text-text-muted text-sm text-center py-4">
              No teams left in {regionFilter}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
