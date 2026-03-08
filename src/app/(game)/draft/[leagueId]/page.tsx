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

type MobileTab = "auction" | "rosters" | "board" | "standings";

export default function DraftPage() {
  const params = useParams();
  const leagueId = params.leagueId as string;
  const router = useRouter();
  const { identity } = usePlayerIdentity();
  const [mobileTab, setMobileTab] = useState<MobileTab>("auction");
  const [desktopSideTab, setDesktopSideTab] = useState<"rosters" | "board">("rosters");

  const { league } = useLeague(leagueId);
  const { auction, loading: auctionLoading } = useAuction(leagueId);
  const { teams } = useTeams(leagueId);
  const { players } = usePlayers(leagueId);
  const { history } = useDraftHistory(leagueId);

  const isNominator = auction?.nominatorId === identity?.playerId;
  const isBidding = auction?.phase === "BIDDING";

  // Auto-switch to auction tab when bidding starts or it's your turn
  useEffect(() => {
    if (isBidding || (auction?.phase === "NOMINATION" && isNominator)) {
      setMobileTab("auction");
    }
  }, [isBidding, isNominator, auction?.phase]);

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

  // Auction content (shared between mobile tab and desktop main area)
  const auctionContent = (
    <>
      {auction.phase === "NOMINATION" && (
        <NominationPanel
          leagueId={leagueId}
          playerId={identity!.playerId}
          playerName={identity!.playerName}
          isNominator={isNominator}
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
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Header Bar */}
      <header className="bg-surface-card border-b border-surface-border px-3 py-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-black">
              <span className="text-accent">Bid</span>
              <span className="text-text-primary">Bracket</span>
            </h1>
            <span className="text-text-muted text-xs hidden sm:block">
              {league?.name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-muted">
              Rd {auction.roundNumber}
            </span>
            <span className="font-financial text-accent">
              {auction.totalTeamsDrafted}/68
            </span>
            <div className="w-px h-3 bg-surface-border" />
            <span className="font-financial text-accent font-bold text-sm">
              ${currentPlayer.budget}
            </span>
          </div>
        </div>
      </header>

      {/* ====== MOBILE LAYOUT (below lg breakpoint) ====== */}
      <div className="lg:hidden flex-1 flex flex-col min-h-0">
        {/* Mobile Tab Content */}
        <div className="flex-1 overflow-y-auto p-3 pb-16">
          {mobileTab === "auction" && (
            <div className="bg-surface-card border border-surface-border rounded-xl p-4">
              {auctionContent}
            </div>
          )}
          {mobileTab === "rosters" && (
            <AllPlayersRosters
              players={players}
              teams={teams}
              currentPlayerId={identity!.playerId}
            />
          )}
          {mobileTab === "board" && (
            <DraftBoard
              history={history}
              players={players}
              totalTeamsDrafted={auction.totalTeamsDrafted}
            />
          )}
          {mobileTab === "standings" && (
            <DraftStandings
              players={players}
              teams={teams}
              currentPlayerId={identity!.playerId}
            />
          )}
        </div>

        {/* Mobile Bottom Tab Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-surface-card border-t border-surface-border px-2 py-1 safe-bottom z-50">
          <div className="flex justify-around">
            {[
              { id: "auction" as MobileTab, label: "Auction", icon: "M" , alert: isBidding || isNominator },
              { id: "rosters" as MobileTab, label: "Rosters", icon: "R", alert: false },
              { id: "board" as MobileTab, label: "Board", icon: "B", alert: false },
              { id: "standings" as MobileTab, label: "Standings", icon: "S", alert: false },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMobileTab(tab.id)}
                className={`
                  flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-lg transition-colors relative
                  ${mobileTab === tab.id
                    ? "text-accent"
                    : "text-text-muted"
                  }
                `}
              >
                {tab.alert && mobileTab !== tab.id && (
                  <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-accent animate-pulse" />
                )}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  {tab.id === "auction" && <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  {tab.id === "rosters" && <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />}
                  {tab.id === "board" && <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />}
                  {tab.id === "standings" && <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />}
                </svg>
                <span className="text-[10px] font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* ====== DESKTOP LAYOUT (lg and above) ====== */}
      <div className="hidden lg:flex flex-1 max-w-[1600px] mx-auto w-full px-4 py-3 gap-4 min-h-0">
        {/* Left - Auction Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-surface-card border border-surface-border rounded-xl p-5 h-full overflow-y-auto">
            {auctionContent}
          </div>
        </div>

        {/* Right Side - Standings + Tabbed Panel */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-3 h-[calc(100vh-60px)]">
          {/* Standings */}
          <DraftStandings
            players={players}
            teams={teams}
            currentPlayerId={identity!.playerId}
          />

          {/* Tabbed: Rosters / Draft Board */}
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="flex gap-1 mb-2">
              <button
                onClick={() => setDesktopSideTab("rosters")}
                className={`
                  flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors
                  ${desktopSideTab === "rosters"
                    ? "bg-accent text-white"
                    : "bg-surface-hover text-text-secondary hover:bg-surface-border"
                  }
                `}
              >
                All Rosters
              </button>
              <button
                onClick={() => setDesktopSideTab("board")}
                className={`
                  flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors
                  ${desktopSideTab === "board"
                    ? "bg-accent text-white"
                    : "bg-surface-hover text-text-secondary hover:bg-surface-border"
                  }
                `}
              >
                Draft Board
              </button>
            </div>

            <div className="flex-1 min-h-0">
              {desktopSideTab === "rosters" && (
                <AllPlayersRosters
                  players={players}
                  teams={teams}
                  currentPlayerId={identity!.playerId}
                />
              )}
              {desktopSideTab === "board" && (
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
  );
}
