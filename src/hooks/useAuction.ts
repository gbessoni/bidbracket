"use client";

import { useState, useEffect } from "react";
import { onValue } from "firebase/database";
import { auctionRef } from "@/lib/firebase/database";
import { AuctionState } from "@/types";

export function useAuction(leagueId: string) {
  const [auction, setAuction] = useState<AuctionState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!leagueId) return;

    const unsubscribe = onValue(auctionRef(leagueId), (snapshot) => {
      if (snapshot.exists()) {
        setAuction(snapshot.val());
      } else {
        setAuction(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [leagueId]);

  return { auction, loading };
}
