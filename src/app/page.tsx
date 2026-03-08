"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlayerIdentity } from "@/context/PlayerContext";
import CreateLeagueForm from "@/components/onboarding/CreateLeagueForm";
import JoinLeagueForm from "@/components/onboarding/JoinLeagueForm";
import RejoinLeagueForm from "@/components/onboarding/RejoinLeagueForm";
import Button from "@/components/ui/Button";

export default function Home() {
  const [mode, setMode] = useState<"landing" | "create" | "join" | "rejoin">("landing");
  const { identity, clearIdentity } = usePlayerIdentity();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!identity || redirecting) return;

    // Verify the league still exists before redirecting
    import("firebase/database").then(({ get, ref }) =>
      import("@/lib/firebase/config").then(({ getDb }) =>
        get(ref(getDb(), `leagues/${identity.leagueId}`)).then((snap) => {
          if (snap.exists()) {
            setRedirecting(true);
            router.push(`/lobby/${identity.leagueId}`);
          } else {
            // League was deleted — clear stale identity
            clearIdentity();
          }
        })
      )
    );
  }, [identity, router, redirecting, clearIdentity]);

  if (redirecting) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo / Branding */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-black tracking-tight">
            <span className="text-accent">Bid</span>
            <span className="text-text-primary">Bracket</span>
          </h1>
          <p className="text-text-secondary text-lg">Auction Draft</p>
          <div className="flex items-center justify-center gap-2 text-text-muted text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
            NCAA March Madness 2026
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center">
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
            Draft your dream bracket. Bid against friends in real-time auctions.
            Win the tournament.
          </p>
        </div>

        {mode === "landing" && (
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full"
              onClick={() => setMode("create")}
            >
              Create a League
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => setMode("join")}
            >
              Join a League
            </Button>
            <button
              onClick={() => setMode("rejoin")}
              className="w-full text-center text-text-muted text-sm hover:text-accent transition-colors pt-2"
            >
              Rejoin existing league
            </button>
          </div>
        )}

        {mode === "create" && (
          <div className="space-y-4">
            <CreateLeagueForm />
            <button
              onClick={() => setMode("landing")}
              className="w-full text-center text-text-muted text-sm hover:text-text-secondary transition-colors"
            >
              Back
            </button>
          </div>
        )}

        {mode === "join" && (
          <div className="space-y-4">
            <JoinLeagueForm />
            <button
              onClick={() => setMode("landing")}
              className="w-full text-center text-text-muted text-sm hover:text-text-secondary transition-colors"
            >
              Back
            </button>
          </div>
        )}

        {mode === "rejoin" && (
          <div className="space-y-4">
            <RejoinLeagueForm />
            <button
              onClick={() => setMode("landing")}
              className="w-full text-center text-text-muted text-sm hover:text-text-secondary transition-colors"
            >
              Back
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-text-muted text-xs pt-8">
          <div className="flex items-center justify-center gap-1">
            <span className="font-financial text-accent">$100</span>
            <span>budget per player</span>
            <span className="mx-1">&middot;</span>
            <span className="font-financial text-accent">68</span>
            <span>teams</span>
          </div>
        </div>
      </div>
    </div>
  );
}
