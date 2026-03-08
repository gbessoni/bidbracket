"use client";

import { Team, Player } from "@/types";
import Card from "@/components/ui/Card";
import TeamLogo from "@/components/ui/TeamLogo";
import Badge from "@/components/ui/Badge";
import { REGION_BG_CLASSES } from "@/lib/constants/regions";

interface TeamStatusGridProps {
  teams: Team[];
  players: Player[];
}

export default function TeamStatusGrid({ teams, players }: TeamStatusGridProps) {
  // Group teams by owner
  const teamsByOwner = players.map((player) => ({
    player,
    teams: teams
      .filter((t) => t.ownerId === player.id)
      .sort((a, b) => a.seed - b.seed),
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
        All Teams
      </h3>

      {teamsByOwner.map(({ player, teams: playerTeams }) => (
        <Card key={player.id}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-text-primary">
              {player.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted">
                {playerTeams.filter((t) => t.status !== "ELIMINATED").length} alive
              </span>
              <span className="font-financial text-xs text-accent">
                {playerTeams.reduce((sum, t) => sum + (t.wins || 0), 0)} W
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {playerTeams.map((team) => (
              <div
                key={team.id}
                className={`
                  flex items-center gap-2 p-2 rounded-lg border
                  ${team.status === "ELIMINATED"
                    ? "opacity-40 border-surface-border bg-surface/30"
                    : team.status === "CHAMPION"
                    ? "border-accent bg-accent/10"
                    : "border-surface-border bg-surface/50"
                  }
                `}
              >
                <TeamLogo
                  logoUrl={team.logoUrl}
                  teamName={team.shortName}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className={`text-xs font-medium truncate ${team.status === "ELIMINATED" ? "line-through text-text-muted" : "text-text-primary"}`}>
                      {team.shortName}
                    </span>
                    <span className="font-financial text-[10px] text-text-muted">
                      #{team.seed}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge className={`${REGION_BG_CLASSES[team.region]} text-[9px] px-1`}>
                      {team.region}
                    </Badge>
                    {team.wins > 0 && (
                      <span className="font-financial text-[10px] text-accent">
                        {team.wins}W
                      </span>
                    )}
                  </div>
                </div>
                {team.status === "ELIMINATED" && (
                  <span className="text-[10px] text-alert-urgent">OUT</span>
                )}
                {team.status === "CHAMPION" && (
                  <span className="text-[10px] text-accent">CHAMP</span>
                )}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
