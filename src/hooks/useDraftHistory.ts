"use client";

import { useState, useEffect } from "react";
import { onValue } from "firebase/database";
import { auctionHistoryRef } from "@/lib/firebase/database";
import { DraftHistoryEntry } from "@/types";

export function useDraftHistory(leagueId: string) {
  const [history, setHistory] = useState<DraftHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!leagueId) return;

    const unsubscribe = onValue(auctionHistoryRef(leagueId), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const entries: DraftHistoryEntry[] = Object.entries(data).map(
          ([id, val]) => ({
            id,
            ...(val as Omit<DraftHistoryEntry, "id">),
          })
        );
        entries.sort((a, b) => b.timestamp - a.timestamp);
        setHistory(entries);
      } else {
        setHistory([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [leagueId]);

  return { history, loading };
}
