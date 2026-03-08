"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { usePlayerIdentity } from "@/context/PlayerContext";
import { useLeague } from "@/hooks/useLeague";
import { useAuction } from "@/hooks/useAuction";
import { useTeams } from "@/hooks/useTeams";
import { usePlayers } from "@/hooks/usePlayers";
import { useDraftHistory } from "@/hooks/useDraftHistory";
import NominationPanel from "@/components/draft/NominationPanel";
import BiddingPanel from "@/components/draft/BiddingPanel";
import DraftBoard from "@/components/draft/DraftBoard";
import DraftStandings from "@/components/draft/DraftStandings";
import AllPlayersRosters from "@/components/draft/AllPlayersRosters";
import Spinner from "@/components/ui/Spinner";

type SidebarTab = "rosters" | "board";

export default function DraftPage() {
  const params = useParams();
  const leagueId = params.leagueId as string;
  const router = useRouter();
  const { identity } = usePlayerIdentity();
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>("rosters");

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
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
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
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-text-secondary">
                Round {auction.roundNumber}
              </span>
              <span className="text-text-muted">|</span>
              <span className="font-financial text-accent">
                {auction.totalTeamsDrafted}/68
              </span>
              <span className="text-text-muted">|</span>
              <span className="text-text-secondary">{currentPlayer.name}</span>
              <span className="font-financial text-accent font-bold">
                ${currentPlayer.budget}
              </span>
            </div>
            {/* Mobile budget */}
            <div className="sm:hidden font-financial text-accent font-bold">
              ${currentPlayer.budget}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full px-4 py-4">
        <div className="flex gap-4 h-[calc(100vh-76px)]">

          {/* Left Side - Auction Area */}
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

          {/* Right Side - Standings + Tabbed Panel */}
          <div className="w-80 flex-shrink-0 hidden md:flex flex-col gap-4">
            {/* Standings */}
            <DraftStandings
              players={players}
              teams={teams}
              currentPlayerId={identity!.playerId}
            />

            {/* Tabbed: Rosters / Draft Board */}
            <div className="flex-1 min-h-0 flex flex-col">
              {/* Tab Buttons */}
              <div className="flex gap-1 mb-2">
                <button
                  onClick={() => setSidebarTab("rosters")}
                  className={`
                    flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors
                    ${sidebarTab === "rosters"
                      ? "bg-accent text-white"
                      : "bg-surface-hover text-text-secondary hover:bg-surface-border"
                    }
                  `}
                >
                  All Rosters
                </button>
                <button
                  onClick={() => setSidebarTab("board")}
                  className={`
                    flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors
                    ${sidebarTab === "board"
                      ? "bg-accent text-white"
                      : "bg-surface-hover text-text-secondary hover:bg-surface-border"
                    }
                  `}
                >
                  Draft Board
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 min-h-0">
                {sidebarTab === "rosters" && (
                  <AllPlayersRosters
                    players={players}
                    teams={teams}
                    currentPlayerId={identity!.playerId}
                  />
                )}
                {sidebarTab === "board" && (
                  <DraftBoard
                    history={history}
                    players={players}
                    totalTeamsDrafted={auction.totalTeamsDrafted}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
