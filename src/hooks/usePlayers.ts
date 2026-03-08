"use client";

import { useState, useEffect } from "react";
import { onValue } from "firebase/database";
import { playersRef } from "@/lib/firebase/database";
import { Player } from "@/types";

export function usePlayers(leagueId: string) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!leagueId) return;

    const unsubscribe = onValue(playersRef(leagueId), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const playerList: Player[] = Object.entries(data).map(([id, val]) => ({
          id,
          ...(val as Omit<Player, "id">),
        }));
        playerList.sort((a, b) => a.joinedAt - b.joinedAt);
        setPlayers(playerList);
      } else {
        setPlayers([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [leagueId]);

  return { players, loading };
}
