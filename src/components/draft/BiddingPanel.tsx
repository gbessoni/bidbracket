"use client";

import { useState, useEffect, useCallback } from "react";
import { Team, AuctionState, Player } from "@/types";
import { placeBid, finalizePick } from "@/lib/actions/draft";
import { useTimer } from "@/hooks/useTimer";
import TeamCard from "./TeamCard";
import Timer from "@/components/ui/Timer";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

interface BiddingPanelProps {
  leagueId: string;
  playerId: string;
  playerName: string;
  playerBudget: number;
  auction: AuctionState;
  currentTeam: Team | null;
}

export default function BiddingPanel({
  leagueId,
  playerId,
  playerName,
  playerBudget,
  auction,
  currentTeam,
}: BiddingPanelProps) {
  const [bidAmount, setBidAmount] = useState(auction.currentBid + 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [finalizingRef, setFinalizingRef] = useState(false);
  const timer = useTimer(auction.timerEndsAt);

  // Update bid amount when current bid changes
  useEffect(() => {
    setBidAmount(auction.currentBid + 1);
  }, [auction.currentBid]);

  // Auto-finalize when timer expires
  const handleFinalize = useCallback(async () => {
    if (finalizingRef) return;
    setFinalizingRef(true);
    try {
      await finalizePick(leagueId);
    } catch {
      // Another client may have already finalized
    }
    setFinalizingRef(false);
  }, [leagueId, finalizingRef]);

  useEffect(() => {
    if (timer.isExpired && auction.phase === "BIDDING") {
      handleFinalize();
    }
  }, [timer.isExpired, auction.phase, handleFinalize]);

  const handleBid = async () => {
    setLoading(true);
    setError(null);
    try {
      await placeBid(leagueId, playerId, playerName, bidAmount, playerBudget);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bid failed");
    }
    setLoading(false);
  };

  const isHighBidder = auction.highBidderId === playerId;
  const canBid = !isHighBidder && bidAmount <= playerBudget && !timer.isExpired;

  const quickBids = [1, 5, 10, 25, 50].map((inc) => auction.currentBid + inc);

  return (
    <div className="space-y-4">
      {/* Timer */}
      <Timer
        secondsLeft={timer.secondsLeft}
        progress={timer.progress}
        isUrgent={timer.isUrgent}
      />

      {/* Current Team */}
      {currentTeam && (
        <div className="animate-bid-flash rounded-xl p-1">
          <TeamCard team={currentTeam} size="lg" />
        </div>
      )}

      {/* Current Bid Info */}
      <div className="text-center space-y-1">
        <p className="text-text-muted text-xs uppercase tracking-wider">Current Bid</p>
        <p className="font-financial text-5xl font-bold text-accent">
          ${auction.currentBid}
        </p>
        <p className="text-sm">
          {isHighBidder ? (
            <span className="text-accent font-semibold">You are the highest bidder!</span>
          ) : (
            <span className="text-text-secondary">
              by <span className="font-semibold text-text-primary">{auction.highBidderName}</span>
            </span>
          )}
        </p>
      </div>

      {/* Bid Controls */}
      {!isHighBidder && !timer.isExpired && (
        <div className="space-y-3">
          {/* Quick bid buttons */}
          <div className="grid grid-cols-5 gap-1.5">
            {quickBids.map((amount) => (
              <button
                key={amount}
                onClick={() => setBidAmount(amount)}
                disabled={amount > playerBudget}
                className={`
                  py-2 rounded-lg text-xs font-financial transition-colors
                  ${bidAmount === amount
                    ? "bg-accent text-white"
                    : amount > playerBudget
                    ? "bg-surface-hover text-text-muted opacity-50 cursor-not-allowed"
                    : "bg-surface-hover text-text-secondary hover:bg-surface-border"
                  }
                `}
              >
                ${amount}
              </button>
            ))}
          </div>

          {/* Custom bid input */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted font-financial">
                $
              </span>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(parseInt(e.target.value) || 0)}
                min={auction.currentBid + 1}
                max={playerBudget}
                className="w-full bg-surface border border-surface-border rounded-lg pl-7 pr-3 py-2.5 font-financial text-text-primary focus:outline-none focus:border-accent"
              />
            </div>
            <Button
              onClick={handleBid}
              disabled={!canBid || loading}
              className="px-8"
            >
              {loading ? <Spinner size="sm" /> : "BID"}
            </Button>
          </div>

          {error && (
            <p className="text-alert-urgent text-xs text-center">{error}</p>
          )}

          <p className="text-text-muted text-xs text-center">
            Your budget: <span className="font-financial text-accent">${playerBudget}</span>
          </p>
        </div>
      )}

      {/* Timer expired waiting state */}
      {timer.isExpired && (
        <div className="text-center py-4">
          <Spinner />
          <p className="text-text-muted text-sm mt-2">Finalizing pick...</p>
        </div>
      )}
    </div>
  );
}
