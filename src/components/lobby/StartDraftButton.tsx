"use client";

import { useState } from "react";
import { startDraft } from "@/lib/actions/draft";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

interface StartDraftButtonProps {
  leagueId: string;
  playerId: string;
  playerCount: number;
}

export default function StartDraftButton({ leagueId, playerId, playerCount }: StartDraftButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = async () => {
    setLoading(true);
    setError(null);
    try {
      await startDraft(leagueId, playerId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start draft");
      setLoading(false);
    }
  };

  const disabled = playerCount < 2 || loading;

  return (
    <div className="space-y-2">
      <Button
        size="lg"
        className="w-full"
        onClick={handleStart}
        disabled={disabled}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner size="sm" /> Starting Draft...
          </span>
        ) : (
          `Start Draft (${playerCount} player${playerCount !== 1 ? "s" : ""})`
        )}
      </Button>
      {playerCount < 2 && (
        <p className="text-text-muted text-xs text-center">
          Need at least 2 players to start
        </p>
      )}
      {error && (
        <p className="text-alert-urgent text-xs text-center">{error}</p>
      )}
    </div>
  );
}
