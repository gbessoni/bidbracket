"use client";

import { Player } from "@/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

interface PlayerListProps {
  players: Player[];
  currentPlayerId: string;
}

export default function PlayerList({ players, currentPlayerId }: PlayerListProps) {
  return (
    <Card>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Players
          </h3>
          <span className="font-financial text-sm text-text-muted">
            {players.length} joined
          </span>
        </div>

        <div className="space-y-2">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`
                flex items-center justify-between py-2 px-3 rounded-lg
                ${player.id === currentPlayerId ? "bg-accent/10 border border-accent/20" : "bg-surface/50"}
                animate-slide-in
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center text-sm font-bold text-text-secondary">
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="text-sm font-medium text-text-primary">
                    {player.name}
                  </span>
                  {player.id === currentPlayerId && (
                    <span className="text-text-muted text-xs ml-1">(you)</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {player.isAdmin && (
                  <Badge variant="accent">Admin</Badge>
                )}
                <span className="font-financial text-xs text-text-muted">
                  ${player.budget}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
