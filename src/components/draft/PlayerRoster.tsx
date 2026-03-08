"use client";

import { Team, Player } from "@/types";
import Card from "@/components/ui/Card";
import TeamLogo from "@/components/ui/TeamLogo";

interface PlayerRosterProps {
  player: Player;
  teams: Team[];
}

export default function PlayerRoster({ player, teams }: PlayerRosterProps) {
  const ownedTeams = teams
    .filter((t) => t.ownerId === player.id)
    .sort((a, b) => (a.draftOrder ?? 0) - (b.draftOrder ?? 0));

  const budgetPercent = (player.budget / 1000) * 100;
  const budgetColor =
    player.budget > 500 ? "bg-accent" : player.budget > 200 ? "bg-alert" : "bg-alert-urgent";

  return (
    <Card className="h-full flex flex-col">
      {/* Header */}
      <div className="space-y-3 pb-3 border-b border-surface-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Your Roster
          </h3>
          <span className="text-xs text-text-muted">
            {ownedTeams.length} teams
          </span>
        </div>

        {/* Budget Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Budget</span>
            <span className="font-financial text-lg font-bold text-accent">
              ${player.budget}
            </span>
          </div>
          <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
            <div
              className={`h-full ${budgetColor} rounded-full transition-all duration-300`}
              style={{ width: `${budgetPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-text-muted font-financial">
            <span>$0</span>
            <span>$1,000</span>
          </div>
        </div>
      </div>

      {/* Team List */}
      <div className="flex-1 overflow-y-auto mt-3 space-y-1.5">
        {ownedTeams.length === 0 ? (
          <p className="text-text-muted text-xs text-center py-6">
            No teams drafted yet
          </p>
        ) : (
          ownedTeams.map((team) => (
            <div
              key={team.id}
              className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-surface/50 hover:bg-surface-hover transition-colors"
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
              <span className="font-financial text-xs text-accent">
                ${team.cost}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
