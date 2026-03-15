"use client";

import { Player, Team } from "@/types";
import { calculateBestCase } from "@/lib/actions/tournament";
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
      const bestCase = calculateBestCase(playerTeams);

      return {
        player,
        totalWins,
        teamsAlive,
        totalTeams: playerTeams.length,
        totalSpent,
        bestCase,
      };
    })
    .sort((a, b) => b.totalWins - a.totalWins || b.teamsAlive - a.teamsAlive);

  const leaderId = standings.length > 0 ? standings[0].player.id : null;

  return (
    <Card>
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
        Standings
      </h3>

      <div className="space-y-1">
        {/* Header */}
        <div className="grid grid-cols-[2rem_1fr_3.5rem_5rem_3.5rem_3.5rem] gap-2 px-2 py-1 text-[10px] text-text-muted uppercase tracking-wider">
          <span>#</span>
          <span>Player</span>
          <span className="text-right">Pts</span>
          <span className="text-right">Alive</span>
          <span className="text-right">Best</span>
          <span className="text-right">Spent</span>
        </div>

        {standings.map((s, index) => {
          const isLeader = s.player.id === leaderId && index === 0 && s.totalWins > 0;
          const isCurrentPlayer = s.player.id === currentPlayerId;

          return (
            <div
              key={s.player.id}
              className={`
                grid grid-cols-[2rem_1fr_3.5rem_5rem_3.5rem_3.5rem] gap-2 px-2 py-2 rounded-lg items-center
                ${isLeader && isCurrentPlayer
                  ? "bg-accent/15 border border-accent/30 shadow-sm shadow-accent/10"
                  : isLeader
                  ? "bg-accent/10 border border-accent/20"
                  : isCurrentPlayer
                  ? "bg-accent/5 border border-accent/15"
                  : "hover:bg-surface-hover"
                }
              `}
            >
              <span className={`font-financial text-sm ${isLeader ? "text-accent font-bold" : "text-text-muted"}`}>
                {index + 1}
              </span>
              <div className="flex items-center gap-1.5 min-w-0">
                {isLeader && (
                  <span className="shrink-0 w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center text-[10px] text-accent font-bold">
                    1
                  </span>
                )}
                <span className={`text-sm font-medium truncate ${isLeader ? "text-accent" : "text-text-primary"}`}>
                  {s.player.name}
                </span>
                {isCurrentPlayer && (
                  <span className="text-text-muted text-xs shrink-0">(you)</span>
                )}
              </div>
              <span className={`font-financial text-sm text-right font-bold ${isLeader ? "text-accent" : "text-accent"}`}>
                {s.totalWins}
              </span>
              <span className="font-financial text-sm text-text-secondary text-right">
                {s.teamsAlive}/{s.totalTeams}
              </span>
              <span className="font-financial text-sm text-success/70 text-right">
                {s.bestCase}
              </span>
              <span className="font-financial text-sm text-text-muted text-right">
                ${s.totalSpent}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
