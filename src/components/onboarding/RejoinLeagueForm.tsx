"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePlayerIdentity } from "@/context/PlayerContext";
import { rejoinLeague } from "@/lib/actions/league";
import { validateName, validateInviteCode } from "@/lib/utils/validation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";

export default function RejoinLeagueForm() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setIdentity } = usePlayerIdentity();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const nameErr = validateName(name);
    if (nameErr) { setError(nameErr); return; }

    const codeErr = validateInviteCode(code.toUpperCase());
    if (codeErr) { setError(codeErr); return; }

    setLoading(true);
    try {
      const identity = await rejoinLeague(name.trim(), code.trim());
      setIdentity(identity);
      router.push(`/lobby/${identity.leagueId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to rejoin");
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Return to Your League</h3>
        <p className="text-text-muted text-xs">
          Cleared your browser or on a new device? Enter your name and league code to get back in.
        </p>

        <Input
          label="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          maxLength={20}
        />

        <Input
          label="Invite Code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="e.g., AB3K"
          maxLength={4}
          className="font-financial text-center text-xl tracking-[0.3em] uppercase"
        />

        {error && (
          <p className="text-alert-urgent text-sm">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner size="sm" /> Rejoining...
            </span>
          ) : (
            "Rejoin League"
          )}
        </Button>
      </form>
    </Card>
  );
}
