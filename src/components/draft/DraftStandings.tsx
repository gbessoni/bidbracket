"use client";

import { Player, Team } from "@/types";
import Card from "@/components/ui/Card";

interface DraftStandingsProps {
  players: Player[];
  teams: Team[];
  currentPlayerId: string;
}

export default function DraftStandings({ players, teams, currentPlayerId }: DraftStandingsProps) {
  const standings = players
    .map((player) => {
      const playerTeams = teams.filter((t) => t.ownerId === player.id);
      const totalSpent = playerTeams.reduce((sum, t) => sum + (t.cost || 0), 0);
      const avgSeed = playerTeams.length > 0
        ? playerTeams.reduce((sum, t) => sum + t.seed, 0) / playerTeams.length
        : 0;

      return {
        player,
        teamCount: playerTeams.length,
        totalSpent,
        avgSeed,
      };
    })
    .sort((a, b) => b.teamCount - a.teamCount || a.totalSpent - b.totalSpent);

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider pb-2 mb-2 border-b border-surface-border">
        Standings
      </h3>

      <div className="space-y-1">
        {standings.map((s, index) => {
          const isYou = s.player.id === currentPlayerId;
          return (
            <div
              key={s.player.id}
              className={`
                flex items-center gap-2 px-2 py-1.5 rounded-lg
                ${isYou ? "bg-accent/10 border border-accent/20" : ""}
              `}
            >
              <span className="font-financial text-xs text-text-muted w-4 text-right">
                {index + 1}
              </span>
              <div className="w-6 h-6 rounded-full bg-surface-hover flex items-center justify-center text-[10px] font-bold text-text-secondary">
                {s.player.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-text-primary truncate block">
                  {s.player.name}
                  {isYou && <span className="text-text-muted ml-1">(you)</span>}
                </span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div className="text-center">
                  <span className="font-financial text-xs text-text-primary block">{s.teamCount}</span>
                  <span className="text-[9px] text-text-muted">teams</span>
                </div>
                <div className="text-center">
                  <span className="font-financial text-xs text-accent block">${s.player.budget}</span>
                  <span className="text-[9px] text-text-muted">left</span>
                </div>
                {s.avgSeed > 0 && (
                  <div className="text-center">
                    <span className="font-financial text-xs text-text-secondary block">{s.avgSeed.toFixed(1)}</span>
                    <span className="text-[9px] text-text-muted">avg</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
