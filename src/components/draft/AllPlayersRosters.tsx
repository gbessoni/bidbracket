"use client";

import { useState } from "react";
import { Player, Team } from "@/types";
import Card from "@/components/ui/Card";
import TeamLogo from "@/components/ui/TeamLogo";
import Badge from "@/components/ui/Badge";

interface AllPlayersRostersProps {
  players: Player[];
  teams: Team[];
  currentPlayerId: string;
}

export default function AllPlayersRosters({ players, teams, currentPlayerId }: AllPlayersRostersProps) {
  const [expandedPlayer, setExpandedPlayer] = useState<string | null>(currentPlayerId);

  return (
    <Card className="h-full flex flex-col">
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider pb-3 border-b border-surface-border">
        All Rosters
      </h3>

      <div className="flex-1 overflow-y-auto mt-2 space-y-1">
        {players.map((player) => {
          const playerTeams = teams
            .filter((t) => t.ownerId === player.id)
            .sort((a, b) => (a.draftOrder ?? 0) - (b.draftOrder ?? 0));
          const isExpanded = expandedPlayer === player.id;
          const isYou = player.id === currentPlayerId;

          return (
            <div key={player.id}>
              {/* Player Header - Clickable */}
              <button
                onClick={() => setExpandedPlayer(isExpanded ? null : player.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left
                  ${isYou ? "bg-accent/10 border border-accent/20" : "hover:bg-surface-hover"}
                `}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-surface-hover flex items-center justify-center text-xs font-bold text-text-secondary">
                    {player.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {player.name}
                    {isYou && <span className="text-text-muted text-xs ml-1">(you)</span>}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-text-muted">
                    {playerTeams.length} teams
                  </span>
                  <span className="font-financial text-xs text-accent font-semibold">
                    ${player.budget}
                  </span>
                  <svg
                    className={`w-3 h-3 text-text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Expanded Team List */}
              {isExpanded && (
                <div className="pl-4 pr-2 pb-2 space-y-1 animate-slide-in">
                  {playerTeams.length === 0 ? (
                    <p className="text-text-muted text-[10px] py-2 pl-6">No teams yet</p>
                  ) : (
                    playerTeams.map((team) => (
                      <div
                        key={team.id}
                        className="flex items-center gap-2 py-1 px-2 rounded bg-surface/50"
                      >
                        <TeamLogo
                          logoUrl={team.logoUrl}
                          teamName={team.shortName}
                          size="sm"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-medium text-text-primary truncate block">
                            {team.shortName}
                          </span>
                          <span className="text-[10px] text-text-muted">
                            #{team.seed} {team.region}
                          </span>
                        </div>
                        <span className="font-financial text-[10px] text-accent">
                          ${team.cost}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
