"use client";

import { useState, useMemo } from "react";
import { Team, Region } from "@/types";
import { REGIONS } from "@/lib/constants/regions";
import TeamCard from "./TeamCard";

interface TeamPickerProps {
  teams: Team[];
  onSelect: (team: Team) => void;
  selectedTeamId?: string | null;
}

export default function TeamPicker({ teams, onSelect, selectedTeamId }: TeamPickerProps) {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<Region | "All">("All");
  const [seedFilter, setSeedFilter] = useState<string>("All");

  const availableTeams = useMemo(() => {
    return teams.filter((t) => {
      if (t.status !== "AVAILABLE") return false;
      if (search && !t.name.toLowerCase().includes(search.toLowerCase()) &&
          !t.shortName.toLowerCase().includes(search.toLowerCase())) return false;
      if (regionFilter !== "All" && t.region !== regionFilter) return false;
      if (seedFilter !== "All" && t.seed !== parseInt(seedFilter)) return false;
      return true;
    });
  }, [teams, search, regionFilter, seedFilter]);

  return (
    <div className="space-y-3">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[150px] bg-surface border border-surface-border rounded-lg px-3 py-1.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
        />

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value as Region | "All")}
          className="bg-surface border border-surface-border rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent"
        >
          <option value="All">All Regions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <select
          value={seedFilter}
          onChange={(e) => setSeedFilter(e.target.value)}
          className="bg-surface border border-surface-border rounded-lg px-3 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent"
        >
          <option value="All">All Seeds</option>
          {Array.from({ length: 16 }, (_, i) => i + 1).map((seed) => (
            <option key={seed} value={seed}>#{seed} Seed</option>
          ))}
        </select>
      </div>

      {/* Team count */}
      <p className="text-text-muted text-xs">
        {availableTeams.length} teams available
      </p>

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
          No teams match your filters
        </p>
      )}
    </div>
  );
}
