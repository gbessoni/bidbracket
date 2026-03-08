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
    if (!isNominator) return;
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

  return (
    <div className="space-y-3">
      {/* Status Banner */}
      {isNominator ? (
        <div className="bg-accent/10 border border-accent/30 rounded-lg px-4 py-3 text-center">
          <h3 className="text-base font-bold text-accent">Your Turn to Nominate!</h3>
          <p className="text-text-secondary text-xs mt-0.5">Tap a team to put it up for auction</p>
        </div>
      ) : (
        <div className="bg-alert/10 border border-alert/30 rounded-lg px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-surface-hover flex items-center justify-center">
              <span className="text-sm font-bold text-text-secondary">
                {nominatorName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">{nominatorName}&apos;s Turn</p>
              <p className="text-text-muted text-[10px]">Waiting for nomination...</p>
            </div>
          </div>
          <Spinner size="sm" />
        </div>
      )}

      {/* Always show team browser */}
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
                    flex-1 py-2 rounded-lg text-sm font-financial transition-colors
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
