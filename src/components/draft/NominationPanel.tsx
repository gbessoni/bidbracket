"use client";

import { useState } from "react";
import { Team } from "@/types";
import { nominateTeam } from "@/lib/actions/draft";
import TeamPicker from "./TeamPicker";
import TeamCard from "./TeamCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Spinner from "@/components/ui/Spinner";

interface NominationPanelProps {
  leagueId: string;
  playerId: string;
  playerName: string;
  isNominator: boolean;
  nominatorName: string;
  teams: Team[];
  playerBudget: number;
}

export default function NominationPanel({
  leagueId,
  playerId,
  playerName,
  isNominator,
  nominatorName,
  teams,
  playerBudget,
}: NominationPanelProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [startingBid, setStartingBid] = useState("1");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
    setStartingBid("1");
    setShowModal(true);
  };

  const handleNominate = async () => {
    if (!selectedTeam) return;
    const bid = parseInt(startingBid);
    if (isNaN(bid) || bid < 1 || bid > playerBudget) {
      setError("Invalid starting bid");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await nominateTeam(leagueId, selectedTeam.id, bid, playerId, playerName);
      setShowModal(false);
      setSelectedTeam(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to nominate");
      setLoading(false);
    }
  };

  if (!isNominator) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center">
          <span className="text-2xl font-bold text-text-secondary">
            {nominatorName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="text-center">
          <p className="text-text-primary font-semibold">{nominatorName}&apos;s Turn</p>
          <p className="text-text-muted text-sm">Waiting for them to nominate a team...</p>
        </div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-accent">Your Turn to Nominate!</h3>
        <p className="text-text-secondary text-sm">Select a team to put up for auction</p>
      </div>

      <TeamPicker
        teams={teams}
        onSelect={handleSelectTeam}
        selectedTeamId={selectedTeam?.id}
      />

      {/* Nomination Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setError(null); }}
        title="Set Starting Bid"
      >
        {selectedTeam && (
          <div className="space-y-4">
            <TeamCard team={selectedTeam} size="lg" />

            <Input
              label="Starting Bid"
              type="number"
              value={startingBid}
              onChange={(e) => setStartingBid(e.target.value)}
              min={1}
              max={playerBudget}
              error={error}
            />

            <p className="text-text-muted text-xs">
              Your budget: <span className="font-financial text-accent">${playerBudget}</span>
            </p>

            <div className="flex gap-2">
              {[1, 5, 10, 25].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setStartingBid(String(amount))}
                  className={`
                    flex-1 py-1.5 rounded-lg text-sm font-financial transition-colors
                    ${startingBid === String(amount)
                      ? "bg-accent text-white"
                      : "bg-surface-hover text-text-secondary hover:bg-surface-border"
                    }
                  `}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <Button
              className="w-full"
              onClick={handleNominate}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner size="sm" /> Nominating...
                </span>
              ) : (
                `Nominate for $${startingBid}`
              )}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
