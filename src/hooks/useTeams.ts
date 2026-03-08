"use client";

import { useState, useEffect, useMemo } from "react";
import { onValue } from "firebase/database";
import { teamsRef } from "@/lib/firebase/database";
import { Team, Region } from "@/types";

export function useTeams(leagueId: string) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!leagueId) return;

    const unsubscribe = onValue(teamsRef(leagueId), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const teamList: Team[] = Object.entries(data).map(([id, val]) => ({
          id,
          ...(val as Omit<Team, "id">),
        }));
        setTeams(teamList);
      } else {
        setTeams([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [leagueId]);

  const availableTeams = useMemo(
    () => teams.filter((t) => t.status === "AVAILABLE"),
    [teams]
  );

  const draftedTeams = useMemo(
    () => teams.filter((t) => t.status === "DRAFTED"),
    [teams]
  );

  const teamsByRegion = useMemo(() => {
    const grouped: Record<Region, Team[]> = {
      East: [],
      West: [],
      South: [],
      Midwest: [],
    };
    for (const team of teams) {
      grouped[team.region].push(team);
    }
    for (const region of Object.keys(grouped) as Region[]) {
      grouped[region].sort((a, b) => a.seed - b.seed);
    }
    return grouped;
  }, [teams]);

  return { teams, availableTeams, draftedTeams, teamsByRegion, loading };
}
