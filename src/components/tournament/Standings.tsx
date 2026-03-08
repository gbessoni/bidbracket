"use client";

import { Player, Team } from "@/types";
import Card from "@/components/ui/Card";

interface StandingsProps {
  players: Player[];
  teams: Team[];
  currentPlayerId: string;
}

export default function Standings({ players, teams, currentPlayerId }: StandingsProps) {
  const standings = players
    .map((player) => {
      const playerTeams = teams.filter((t) => t.ownerId === player.id);
      const totalWins = playerTeams.reduce((sum, t) => sum + (t.wins || 0), 0);
      const teamsAlive = playerTeams.filter(
        (t) => t.status !== "ELIMINATED"
      ).length;
      const totalSpent = playerTeams.reduce((sum, t) => sum + (t.cost || 0), 0);

      return {
        player,
        totalWins,
        teamsAlive,
        totalTeams: playerTeams.length,
        totalSpent,
      };
    })
    .sort((a, b) => b.totalWins - a.totalWins || b.teamsAlive - a.teamsAlive);

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
        Standings
      </h3>

      <div className="space-y-1">
        {/* Header */}
        <div className="grid grid-cols-[2rem_1fr_4rem_4rem_4rem_4rem] gap-2 px-2 py-1 text-[10px] text-text-muted uppercase tracking-wider">
          <span>#</span>
          <span>Player</span>
          <span className="text-right">Wins</span>
          <span className="text-right">Alive</span>
          <span className="text-right">Teams</span>
          <span className="text-right">Spent</span>
        </div>

        {standings.map((s, index) => (
          <div
            key={s.player.id}
            className={`
              grid grid-cols-[2rem_1fr_4rem_4rem_4rem_4rem] gap-2 px-2 py-2 rounded-lg items-center
              ${s.player.id === currentPlayerId
                ? "bg-accent/10 border border-accent/20"
                : "hover:bg-surface-hover"
              }
            `}
          >
            <span className="font-financial text-sm text-text-muted">
              {index + 1}
            </span>
            <span className="text-sm font-medium text-text-primary truncate">
              {s.player.name}
              {s.player.id === currentPlayerId && (
                <span className="text-text-muted text-xs ml-1">(you)</span>
              )}
            </span>
            <span className="font-financial text-sm text-accent text-right font-bold">
              {s.totalWins}
            </span>
            <span className="font-financial text-sm text-text-secondary text-right">
              {s.teamsAlive}
            </span>
            <span className="font-financial text-sm text-text-muted text-right">
              {s.totalTeams}
            </span>
            <span className="font-financial text-sm text-text-muted text-right">
              ${s.totalSpent}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
