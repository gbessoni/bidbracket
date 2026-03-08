"use client";

import { GameScore } from "@/types";
import Badge from "@/components/ui/Badge";

interface LiveScoreCardProps {
  game: GameScore;
}

export default function LiveScoreCard({ game }: LiveScoreCardProps) {
  const statusColors = {
    upcoming: "text-text-muted",
    live: "text-alert",
    final: "text-text-secondary",
  };

  return (
    <div className="bg-surface-card border border-surface-border rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <Badge variant={game.status === "live" ? "alert" : "default"}>
          {game.status === "live" ? "LIVE" : game.status === "final" ? "FINAL" : "UPCOMING"}
        </Badge>
        <span className="text-[10px] text-text-muted">{game.round}</span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${game.status === "final" && game.score1 !== null && game.score2 !== null && game.score1 > game.score2 ? "text-accent" : "text-text-primary"}`}>
            {game.team1}
          </span>
          <span className={`font-financial text-sm font-bold ${statusColors[game.status]}`}>
            {game.score1 ?? "-"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${game.status === "final" && game.score1 !== null && game.score2 !== null && game.score2 > game.score1 ? "text-accent" : "text-text-primary"}`}>
            {game.team2}
          </span>
          <span className={`font-financial text-sm font-bold ${statusColors[game.status]}`}>
            {game.score2 ?? "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
