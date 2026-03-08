"use client";

import { DraftHistoryEntry, Player } from "@/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { REGION_BG_CLASSES } from "@/lib/constants/regions";

interface DraftBoardProps {
  history: DraftHistoryEntry[];
  players: Player[];
  totalTeamsDrafted: number;
}

export default function DraftBoard({ history, players, totalTeamsDrafted }: DraftBoardProps) {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between pb-3 border-b border-surface-border">
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
          Draft Board
        </h3>
        <span className="font-financial text-xs text-text-muted">
          {totalTeamsDrafted}/68
        </span>
      </div>

      {/* Player Budget Summary */}
      <div className="py-3 border-b border-surface-border space-y-1.5">
        {players.map((p) => (
          <div key={p.id} className="flex items-center justify-between text-xs">
            <span className="text-text-secondary truncate max-w-[120px]">{p.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-text-muted">
                {Object.keys(p.teams || {}).length} teams
              </span>
              <span className="font-financial text-accent">${p.budget}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Draft History */}
      <div className="flex-1 overflow-y-auto mt-3 space-y-1">
        {history.length === 0 ? (
          <p className="text-text-muted text-xs text-center py-6">
            No picks yet
          </p>
        ) : (
          history.map((entry, index) => (
            <div
              key={entry.id || index}
              className="flex items-center gap-2 py-2 px-2 rounded-lg bg-surface/50 animate-slide-in"
            >
              <span className="font-financial text-xs text-text-muted w-6 text-right">
                {totalTeamsDrafted - index}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-text-primary truncate">
                    {entry.teamName}
                  </span>
                  <span className="font-financial text-[10px] text-text-muted">
                    #{entry.teamSeed}
                  </span>
                  <Badge className={`${REGION_BG_CLASSES[entry.teamRegion]} text-[9px] px-1`}>
                    {entry.teamRegion.slice(0, 1)}
                  </Badge>
                </div>
                <span className="text-[10px] text-text-muted">
                  {entry.winnerName}
                </span>
              </div>
              <span className="font-financial text-xs text-accent font-semibold">
                ${entry.cost}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
