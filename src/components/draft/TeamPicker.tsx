"use client";

import { useState, useMemo } from "react";
import { Team, Region } from "@/types";
import { REGIONS, REGION_BG_CLASSES } from "@/lib/constants/regions";
import TeamCard from "./TeamCard";

interface TeamPickerProps {
  teams: Team[];
  onSelect: (team: Team) => void;
  selectedTeamId?: string | null;
}

export default function TeamPicker({ teams, onSelect, selectedTeamId }: TeamPickerProps) {
  const [regionFilter, setRegionFilter] = useState<Region | "All">("All");

  const availableTeams = useMemo(() => {
    return teams
      .filter((t) => {
        if (t.status !== "AVAILABLE") return false;
        if (regionFilter !== "All" && t.region !== regionFilter) return false;
        return true;
      })
      .sort((a, b) => a.seed - b.seed);
  }, [teams, regionFilter]);

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { All: 0 };
    REGIONS.forEach((r) => (counts[r] = 0));
    teams.forEach((t) => {
      if (t.status === "AVAILABLE") {
        counts.All++;
        counts[t.region]++;
      }
    });
    return counts;
  }, [teams]);

  return (
    <div className="space-y-3">
      {/* Region Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setRegionFilter("All")}
          className={`
            px-4 py-2 rounded-lg text-sm font-semibold transition-all
            ${regionFilter === "All"
              ? "bg-accent text-white shadow-lg shadow-accent/20"
              : "bg-surface-hover text-text-secondary hover:bg-surface-border"
            }
          `}
        >
          All <span className="font-financial text-xs ml-1">({regionCounts.All})</span>
        </button>
        {REGIONS.map((region) => (
          <button
            key={region}
            onClick={() => setRegionFilter(region)}
            className={`
              px-4 py-2 rounded-lg text-sm font-semibold transition-all
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-1">
        {availableTeams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            size="sm"
            onClick={() => onSelect(team)}
            selected={team.id === selectedTeamId}
          />
        ))}
      </div>

      {availableTeams.length === 0 && (
        <p className="text-text-muted text-sm text-center py-8">
          No teams available in this region
        </p>
      )}
    </div>
  );
}
