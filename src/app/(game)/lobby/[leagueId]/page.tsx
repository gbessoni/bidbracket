"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePlayerIdentity } from "@/context/PlayerContext";
import { useLeague } from "@/hooks/useLeague";
import { usePlayers } from "@/hooks/usePlayers";
import PlayerList from "@/components/lobby/PlayerList";
import StartDraftButton from "@/components/lobby/StartDraftButton";
import LobbyStatus from "@/components/lobby/LobbyStatus";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";

export default function LobbyPage() {
  const params = useParams();
  const leagueId = params.leagueId as string;
  const router = useRouter();
  const { identity, clearIdentity } = usePlayerIdentity();
  const { league, loading: leagueLoading } = useLeague(leagueId);
  const { players, loading: playersLoading } = usePlayers(leagueId);

  // Redirect based on league status
  useEffect(() => {
    if (!league) return;
    if (league.status === "DRAFTING") {
      router.push(`/draft/${leagueId}`);
    } else if (league.status === "TOURNAMENT") {
      router.push(`/tournament/${leagueId}`);
    }
  }, [league, leagueId, router]);

  if (leagueLoading || playersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!league) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <p className="text-text-secondary">League not found</p>
        </Card>
      </div>
    );
  }

  const isAdmin = identity?.isAdmin ?? false;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-lg w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tight">
            <span className="text-accent">Bid</span>
            <span className="text-text-primary">Bracket</span>
          </h1>
          <h2 className="text-xl font-bold text-text-primary">{league.name}</h2>
        </div>

        {/* Invite Code */}
        <Card glow>
          <div className="text-center space-y-2">
            <p className="text-text-secondary text-sm">Invite Code</p>
            <div className="flex items-center justify-center gap-3">
              <span className="font-financial text-3xl font-bold text-accent tracking-[0.3em]">
                {league.code}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(league.code)}
                className="text-text-muted hover:text-accent transition-colors"
                title="Copy code"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <p className="text-text-muted text-xs">Share this code with friends to join</p>
          </div>
        </Card>

        {/* Player List */}
        <PlayerList players={players} currentPlayerId={identity?.playerId ?? ""} />

        {/* Status / Actions */}
        {isAdmin ? (
          <StartDraftButton
            leagueId={leagueId}
            playerId={identity?.playerId ?? ""}
            playerCount={players.length}
          />
        ) : (
          <LobbyStatus />
        )}

        {/* Leave */}
        <button
          onClick={() => {
            clearIdentity();
            router.push("/");
          }}
          className="w-full text-center text-text-muted text-xs hover:text-alert-urgent transition-colors"
        >
          Leave League
        </button>
      </div>
    </div>
  );
}
