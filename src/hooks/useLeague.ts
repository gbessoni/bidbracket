"use client";

import { useState, useEffect } from "react";
import { onValue } from "firebase/database";
import { leagueRef } from "@/lib/firebase/database";
import { League } from "@/types";

export function useLeague(leagueId: string) {
  const [league, setLeague] = useState<League | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!leagueId) return;

    const unsubscribe = onValue(leagueRef(leagueId), (snapshot) => {
      if (snapshot.exists()) {
        setLeague({ id: leagueId, ...snapshot.val() });
      } else {
        setLeague(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [leagueId]);

  return { league, loading };
}
