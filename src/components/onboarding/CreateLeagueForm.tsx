"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePlayerIdentity } from "@/context/PlayerContext";
import { createLeague } from "@/lib/actions/league";
import { validateName, validateAge, validateLeagueName } from "@/lib/utils/validation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";

export default function CreateLeagueForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [leagueName, setLeagueName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const { setIdentity } = usePlayerIdentity();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const nameErr = validateName(name);
    if (nameErr) { setError(nameErr); return; }

    const ageNum = parseInt(age);
    const ageErr = validateAge(ageNum);
    if (ageErr) { setError(ageErr); return; }

    const leagueErr = validateLeagueName(leagueName);
    if (leagueErr) { setError(leagueErr); return; }

    setLoading(true);
    try {
      const identity = await createLeague(name.trim(), ageNum, leagueName.trim());
      setIdentity(identity);

      // Get the invite code from the league
      const { get, ref } = await import("firebase/database");
      const { getDb } = await import("@/lib/firebase/config");
      const snap = await get(ref(getDb(), `leagues/${identity.leagueId}/code`));
      setInviteCode(snap.val());

      // Brief delay to show code, then redirect
      setTimeout(() => {
        router.push(`/lobby/${identity.leagueId}`);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create league");
      setLoading(false);
    }
  };

  if (inviteCode) {
    return (
      <Card glow>
        <div className="text-center space-y-4">
          <h3 className="text-lg font-bold text-text-primary">League Created!</h3>
          <p className="text-text-secondary text-sm">Share this code with your friends:</p>
          <div className="bg-surface rounded-lg p-4">
            <span className="font-financial text-4xl font-bold text-accent tracking-[0.3em]">
              {inviteCode}
            </span>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(inviteCode)}
            className="text-accent text-sm hover:text-accent-light transition-colors"
          >
            Copy to clipboard
          </button>
          <p className="text-text-muted text-xs">Redirecting to lobby...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Create a League</h3>

        <Input
          label="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          maxLength={20}
        />

        <Input
          label="Your Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
          min={13}
          max={120}
        />

        <Input
          label="League Name"
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
          placeholder="e.g., Office Bracket Brawl"
          maxLength={30}
        />

        {error && (
          <p className="text-alert-urgent text-sm">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner size="sm" /> Creating...
            </span>
          ) : (
            "Create League"
          )}
        </Button>
      </form>
    </Card>
  );
}
