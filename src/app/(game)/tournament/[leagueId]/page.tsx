"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { usePlayerIdentity } from "@/context/PlayerContext";
import { useLeague } from "@/hooks/useLeague";
import { useTeams } from "@/hooks/useTeams";
import { usePlayers } from "@/hooks/usePlayers";
import Standings from "@/components/tournament/Standings";
import TeamStatusGrid from "@/components/tournament/TeamStatusGrid";
import LiveScoreCard from "@/components/tournament/LiveScoreCard";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import { GameScore } from "@/types";

export default function TournamentPage() {
  const params = useParams();
  const leagueId = params.leagueId as string;
  const { identity } = usePlayerIdentity();

  const { league, loading: leagueLoading } = useLeague(leagueId);
  const { teams } = useTeams(leagueId);
  const { players } = usePlayers(leagueId);

  const [scores, setScores] = useState<GameScore[]>([]);
  const [scoresLoading, setScoresLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchScores = useCallback(async () => {
    setScoresLoading(true);
    try {
      const res = await fetch("/api/scores");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setScores(data);
          setLastUpdated(new Date().toLocaleTimeString());
        }
      }
    } catch (error) {
      console.error("Failed to fetch scores:", error);
    }
    setScoresLoading(false);
  }, []);

  // Fetch scores on mount and every 5 minutes
  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchScores]);

  if (leagueLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-surface-card border-b border-surface-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black">
              <span className="text-accent">Bid</span>
              <span className="text-text-primary">Bracket</span>
            </h1>
            <span className="text-text-muted text-sm hidden sm:block">
              {league?.name} &middot; Tournament
            </span>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-text-muted text-xs">
                Updated: {lastUpdated}
              </span>
            )}
            <Button
              size="sm"
              variant="secondary"
              onClick={fetchScores}
              disabled={scoresLoading}
            >
              {scoresLoading ? <Spinner size="sm" /> : "Refresh Scores"}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Standings */}
        <Standings
          players={players}
          teams={teams}
          currentPlayerId={identity?.playerId ?? ""}
        />

        {/* Live Scores */}
        {scores.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
              Live Scores
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {scores.map((game, index) => (
                <LiveScoreCard key={index} game={game} />
              ))}
            </div>
          </div>
        )}

        {scores.length === 0 && !scoresLoading && (
          <Card>
            <div className="text-center py-8">
              <p className="text-text-secondary">No tournament games yet</p>
              <p className="text-text-muted text-sm mt-1">
                Scores will appear here once the tournament begins
              </p>
            </div>
          </Card>
        )}

        {/* Team Status Grid */}
        <TeamStatusGrid teams={teams} players={players} />
      </div>
    </div>
  );
}
