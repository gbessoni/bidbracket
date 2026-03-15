"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
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
import {
  recordGameResults,
  getTournamentSummary,
} from "@/lib/actions/tournament";

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
  const processedGamesRef = useRef<Set<string>>(new Set());

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

  // Auto-record final game results to Firebase
  useEffect(() => {
    if (!leagueId || scores.length === 0) return;

    const finalGames = scores.filter((g) => g.status === "final");
    const newFinalGames = finalGames.filter((g) => {
      const key = `${g.team1}-${g.team2}-${g.score1}-${g.score2}`;
      return !processedGamesRef.current.has(key);
    });

    if (newFinalGames.length === 0) return;

    // Mark as processed before calling to prevent duplicate calls
    newFinalGames.forEach((g) => {
      const key = `${g.team1}-${g.team2}-${g.score1}-${g.score2}`;
      processedGamesRef.current.add(key);
    });

    recordGameResults(leagueId, newFinalGames)
      .then((result) => {
        if (result.errors.length > 0) {
          console.warn("Some game results failed to record:", result.errors);
        }
      })
      .catch((err) => {
        console.error("Failed to record game results:", err);
      });
  }, [leagueId, scores]);

  // Fetch scores on mount and every 5 minutes
  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchScores]);

  // Group scores by round
  const scoresByRound = scores.reduce<Record<string, GameScore[]>>(
    (acc, game) => {
      const round = game.round || "Unknown";
      if (!acc[round]) acc[round] = [];
      acc[round].push(game);
      return acc;
    },
    {}
  );

  // Order rounds logically
  const roundOrder = [
    "First Four",
    "Round of 64",
    "Round of 32",
    "Sweet 16",
    "Elite 8",
    "Final Four",
    "Championship",
  ];

  const orderedRounds = Object.keys(scoresByRound).sort((a, b) => {
    const aIdx = roundOrder.indexOf(a);
    const bIdx = roundOrder.indexOf(b);
    return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
  });

  const summary = getTournamentSummary(scores);

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
        {/* Tournament Summary Card */}
        {scores.length > 0 && (
          <Card>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-semibold text-accent">
                {summary.currentRound}
              </span>
              <span className="text-text-muted">&middot;</span>
              <span className="text-text-secondary">
                {summary.completedGames}/{summary.totalGames} games complete
              </span>
              {summary.liveGames > 0 && (
                <>
                  <span className="text-text-muted">&middot;</span>
                  <span className="text-alert font-medium">
                    {summary.liveGames} live now
                  </span>
                </>
              )}
              {summary.nextGame && (
                <>
                  <span className="text-text-muted">&middot;</span>
                  <span className="text-text-secondary">
                    Next: {summary.nextGame.team1} vs {summary.nextGame.team2}
                  </span>
                </>
              )}
            </div>
          </Card>
        )}

        {/* Standings */}
        <Standings
          players={players}
          teams={teams}
          currentPlayerId={identity?.playerId ?? ""}
        />

        {/* Live Scores grouped by round */}
        {scores.length > 0 && (
          <div className="space-y-6">
            {orderedRounds.map((round) => {
              const roundGames = scoresByRound[round];
              const liveCount = roundGames.filter(
                (g) => g.status === "live"
              ).length;

              return (
                <div key={round} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
                      {round}
                    </h3>
                    {liveCount > 0 && (
                      <span className="text-[10px] font-bold text-alert bg-alert/10 px-1.5 py-0.5 rounded">
                        {liveCount} LIVE
                      </span>
                    )}
                    <span className="text-[10px] text-text-muted">
                      {roundGames.filter((g) => g.status === "final").length}/
                      {roundGames.length} complete
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {roundGames.map((game, index) => (
                      <LiveScoreCard key={`${round}-${index}`} game={game} />
                    ))}
                  </div>
                </div>
              );
            })}
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
