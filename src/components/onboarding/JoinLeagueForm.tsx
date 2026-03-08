"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePlayerIdentity } from "@/context/PlayerContext";
import { joinLeague } from "@/lib/actions/league";
import { validateName, validateAge, validateInviteCode } from "@/lib/utils/validation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";

export default function JoinLeagueForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
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

    const ageNum = parseInt(age);
    const ageErr = validateAge(ageNum);
    if (ageErr) { setError(ageErr); return; }

    const codeErr = validateInviteCode(code.toUpperCase());
    if (codeErr) { setError(codeErr); return; }

    setLoading(true);
    try {
      const identity = await joinLeague(name.trim(), ageNum, code.trim());
      setIdentity(identity);
      router.push(`/lobby/${identity.leagueId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join league");
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Join a League</h3>

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
              <Spinner size="sm" /> Joining...
            </span>
          ) : (
            "Join League"
          )}
        </Button>
      </form>
    </Card>
  );
}
