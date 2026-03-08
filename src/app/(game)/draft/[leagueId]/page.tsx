"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { usePlayerIdentity } from "@/context/PlayerContext";
import { useLeague } from "@/hooks/useLeague";
import { useAuction } from "@/hooks/useAuction";
import { useTeams } from "@/hooks/useTeams";
import { usePlayers } from "@/hooks/usePlayers";
import { useDraftHistory } from "@/hooks/useDraftHistory";
import NominationPanel from "@/components/draft/NominationPanel";
import BiddingPanel from "@/components/draft/BiddingPanel";
import PlayerRoster from "@/components/draft/PlayerRoster";
import DraftBoard from "@/components/draft/DraftBoard";
import Spinner from "@/components/ui/Spinner";

export default function DraftPage() {
  const params = useParams();
  const leagueId = params.leagueId as string;
  const router = useRouter();
  const { identity } = usePlayerIdentity();

  const { league } = useLeague(leagueId);
  const { auction, loading: auctionLoading } = useAuction(leagueId);
  const { teams } = useTeams(leagueId);
  const { players } = usePlayers(leagueId);
  const { history } = useDraftHistory(leagueId);

  // Redirect to tournament if complete
  useEffect(() => {
    if (league?.status === "TOURNAMENT" || auction?.phase === "COMPLETE") {
      router.push(`/tournament/${leagueId}`);
    }
  }, [league, auction, leagueId, router]);

  const currentPlayer = useMemo(
    () => players.find((p) => p.id === identity?.playerId),
    [players, identity]
  );

  const nominatorPlayer = useMemo(
    () => players.find((p) => p.id === auction?.nominatorId),
    [players, auction]
  );

  const currentTeam = useMemo(
    () => (auction?.currentTeamId ? teams.find((t) => t.id === auction.currentTeamId) ?? null : null),
    [teams, auction]
  );

  if (auctionLoading || !auction || !currentPlayer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Bar */}
      <header className="bg-surface-card border-b border-surface-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-black">
              <span className="text-accent">Bid</span>
              <span className="text-text-primary">Bracket</span>
            </h1>
            <span className="text-text-muted text-sm hidden sm:block">
              {league?.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-text-secondary text-sm">
              Round {auction.roundNumber}
            </span>
            <span className="font-financial text-sm text-accent">
              {auction.totalTeamsDrafted}/68
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-4">
        <div className="flex gap-4 h-[calc(100vh-80px)]">
          {/* Left Sidebar - Player Roster */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <PlayerRoster player={currentPlayer} teams={teams} />
          </div>

          {/* Center - Auction Area */}
          <div className="flex-1 min-w-0">
            <div className="bg-surface-card border border-surface-border rounded-xl p-6 h-full overflow-y-auto">
              {auction.phase === "NOMINATION" && (
                <NominationPanel
                  leagueId={leagueId}
                  playerId={identity!.playerId}
                  playerName={identity!.playerName}
                  isNominator={auction.nominatorId === identity!.playerId}
                  nominatorName={nominatorPlayer?.name ?? "Unknown"}
                  teams={teams}
                  playerBudget={currentPlayer.budget}
                />
              )}

              {auction.phase === "BIDDING" && (
                <BiddingPanel
                  leagueId={leagueId}
                  playerId={identity!.playerId}
                  playerName={identity!.playerName}
                  playerBudget={currentPlayer.budget}
                  auction={auction}
                  currentTeam={currentTeam}
                />
              )}
            </div>
          </div>

          {/* Right Sidebar - Draft Board */}
          <div className="w-72 flex-shrink-0 hidden md:block">
            <DraftBoard
              history={history}
              players={players}
              totalTeamsDrafted={auction.totalTeamsDrafted}
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar - Budget */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface-card border-t border-surface-border px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-sm">{currentPlayer.name}</span>
          <div className="flex items-center gap-3">
            <span className="text-text-muted text-xs">
              {Object.keys(currentPlayer.teams || {}).length} teams
            </span>
            <span className="font-financial text-lg font-bold text-accent">
              ${currentPlayer.budget}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
