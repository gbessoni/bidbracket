"use client";

import { useState } from "react";
import { NCAA_TEAMS, getTeamLogoUrl } from "@/lib/constants/teams";
import { REGIONS } from "@/lib/constants/regions";
import { Region } from "@/types";
import TeamLogo from "@/components/ui/TeamLogo";

export default function AdminPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region | "All">("All");
  const [showIssuesOnly, setShowIssuesOnly] = useState(false);

  const filteredTeams =
    selectedRegion === "All"
      ? NCAA_TEAMS
      : NCAA_TEAMS.filter((t) => t.region === selectedRegion);

  const displayTeams = showIssuesOnly
    ? filteredTeams.filter((t) => !t.record || !t.espnId)
    : filteredTeams;

  const regionCounts = REGIONS.reduce(
    (acc, r) => {
      acc[r] = NCAA_TEAMS.filter((t) => t.region === r).length;
      return acc;
    },
    {} as Record<string, number>
  );

  const firstFourCount = NCAA_TEAMS.filter((t) => t.isFirstFour).length;
  const totalTeams = NCAA_TEAMS.length;

  // Check for duplicate IDs
  const idCounts = NCAA_TEAMS.reduce(
    (acc, t) => {
      acc[t.id] = (acc[t.id] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const duplicateIds = Object.entries(idCounts).filter(([, c]) => c > 1);

  // Check for duplicate espnIds
  const espnIdCounts = NCAA_TEAMS.reduce(
    (acc, t) => {
      acc[t.espnId] = (acc[t.espnId] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );
  const duplicateEspnIds = Object.entries(espnIdCounts).filter(
    ([, c]) => c > 1
  );

  return (
    <div className="min-h-screen bg-surface p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-surface-card border border-surface-border rounded-xl p-5">
          <h1 className="text-2xl font-black">
            <span className="text-accent">Bid</span>
            <span className="text-text-primary">Bracket</span>
            <span className="text-text-muted text-sm font-normal ml-3">
              Admin Panel
            </span>
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Review all 68 teams, logos, records, and bracket data
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="bg-surface-card border border-surface-border rounded-lg p-3 text-center">
            <div className="font-financial text-2xl text-accent font-bold">
              {totalTeams}
            </div>
            <div className="text-[10px] text-text-muted uppercase">
              Total Teams
            </div>
          </div>
          {REGIONS.map((r) => (
            <div
              key={r}
              className="bg-surface-card border border-surface-border rounded-lg p-3 text-center"
            >
              <div className="font-financial text-2xl text-text-primary font-bold">
                {regionCounts[r]}
              </div>
              <div className="text-[10px] text-text-muted uppercase">{r}</div>
            </div>
          ))}
          <div className="bg-surface-card border border-surface-border rounded-lg p-3 text-center">
            <div className="font-financial text-2xl text-alert font-bold">
              {firstFourCount}
            </div>
            <div className="text-[10px] text-text-muted uppercase">
              First Four
            </div>
          </div>
          <div className="bg-surface-card border border-surface-border rounded-lg p-3 text-center">
            <div
              className={`font-financial text-2xl font-bold ${duplicateIds.length + duplicateEspnIds.length > 0 ? "text-alert-urgent" : "text-accent"}`}
            >
              {duplicateIds.length + duplicateEspnIds.length}
            </div>
            <div className="text-[10px] text-text-muted uppercase">Issues</div>
          </div>
        </div>

        {/* Issues */}
        {duplicateIds.length > 0 && (
          <div className="bg-alert-urgent/10 border border-alert-urgent/30 rounded-lg p-3">
            <span className="text-alert-urgent text-sm font-bold">
              Duplicate IDs:{" "}
            </span>
            <span className="text-text-secondary text-sm">
              {duplicateIds.map(([id]) => id).join(", ")}
            </span>
          </div>
        )}
        {duplicateEspnIds.length > 0 && (
          <div className="bg-alert-urgent/10 border border-alert-urgent/30 rounded-lg p-3">
            <span className="text-alert-urgent text-sm font-bold">
              Duplicate ESPN IDs:{" "}
            </span>
            <span className="text-text-secondary text-sm">
              {duplicateEspnIds.map(([id]) => id).join(", ")}
            </span>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedRegion("All")}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              selectedRegion === "All"
                ? "bg-accent text-white"
                : "bg-surface-hover text-text-secondary hover:bg-surface-border"
            }`}
          >
            All ({totalTeams})
          </button>
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                selectedRegion === r
                  ? "bg-accent text-white"
                  : "bg-surface-hover text-text-secondary hover:bg-surface-border"
              }`}
            >
              {r} ({regionCounts[r]})
            </button>
          ))}
          <div className="w-px h-6 bg-surface-border mx-1" />
          <label className="flex items-center gap-1.5 text-sm text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={showIssuesOnly}
              onChange={(e) => setShowIssuesOnly(e.target.checked)}
              className="accent-accent"
            />
            Issues only
          </label>
        </div>

        {/* Team Table */}
        <div className="bg-surface-card border border-surface-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border text-[10px] text-text-muted uppercase tracking-wider">
                  <th className="text-left px-3 py-2">Logo</th>
                  <th className="text-left px-3 py-2">Seed</th>
                  <th className="text-left px-3 py-2">Team</th>
                  <th className="text-left px-3 py-2">Short</th>
                  <th className="text-left px-3 py-2">Region</th>
                  <th className="text-left px-3 py-2">Record</th>
                  <th className="text-left px-3 py-2">ESPN ID</th>
                  <th className="text-left px-3 py-2">First Four</th>
                  <th className="text-left px-3 py-2">ID</th>
                </tr>
              </thead>
              <tbody>
                {displayTeams
                  .sort((a, b) => {
                    if (a.region !== b.region)
                      return (
                        REGIONS.indexOf(a.region) - REGIONS.indexOf(b.region)
                      );
                    return a.seed - b.seed;
                  })
                  .map((team) => (
                    <tr
                      key={team.id}
                      className={`border-b border-surface-border/50 hover:bg-surface-hover transition-colors ${
                        team.isFirstFour ? "bg-alert/5" : ""
                      }`}
                    >
                      <td className="px-3 py-2">
                        <TeamLogo
                          logoUrl={getTeamLogoUrl(team.espnId)}
                          teamName={team.shortName}
                          size="md"
                        />
                      </td>
                      <td className="px-3 py-2 font-financial text-accent font-bold">
                        #{team.seed}
                      </td>
                      <td className="px-3 py-2 font-medium text-text-primary">
                        {team.name}
                      </td>
                      <td className="px-3 py-2 text-text-secondary">
                        {team.shortName}
                      </td>
                      <td className="px-3 py-2 text-text-secondary">
                        {team.region}
                      </td>
                      <td className="px-3 py-2 font-financial text-text-primary">
                        {team.record || (
                          <span className="text-alert-urgent">MISSING</span>
                        )}
                      </td>
                      <td className="px-3 py-2 font-financial text-text-muted">
                        {team.espnId}
                      </td>
                      <td className="px-3 py-2">
                        {team.isFirstFour && (
                          <span className="text-[10px] bg-alert/15 text-alert px-1.5 py-0.5 rounded font-bold">
                            FF
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-text-muted text-xs font-mono">
                        {team.id}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-text-muted text-xs py-4">
          BidBracket Admin &middot; Not linked from the main app &middot; Bookmark this page
        </div>
      </div>
    </div>
  );
}
