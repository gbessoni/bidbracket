import { get, update } from "firebase/database";
import { getDb } from "@/lib/firebase/config";
import { GameScore, Team } from "@/types";

/**
 * Process final game results and update team wins/status in Firebase.
 * - Increments winner's wins count
 * - Sets loser's status to "ELIMINATED"
 */
export async function recordGameResults(
  leagueId: string,
  games: GameScore[]
): Promise<{ updated: number; errors: string[] }> {
  const db = getDb();
  const teamsSnap = await get(
    (await import("@/lib/firebase/database")).teamsRef(leagueId)
  );

  if (!teamsSnap.exists()) {
    return { updated: 0, errors: ["No teams found for league"] };
  }

  const teamsData = teamsSnap.val() as Record<string, Team>;
  const teamEntries = Object.entries(teamsData);

  const updates: Record<string, unknown> = {};
  const errors: string[] = [];
  let updated = 0;

  const finalGames = games.filter((g) => g.status === "final");

  for (const game of finalGames) {
    if (game.score1 === null || game.score2 === null) continue;

    const winnerName = game.score1 > game.score2 ? game.team1 : game.team2;
    const loserName = game.score1 > game.score2 ? game.team2 : game.team1;

    // Find winner team by matching name (case-insensitive, partial match)
    const winnerEntry = teamEntries.find(
      ([, t]) =>
        t.name.toLowerCase() === winnerName.toLowerCase() ||
        t.shortName.toLowerCase() === winnerName.toLowerCase()
    );

    const loserEntry = teamEntries.find(
      ([, t]) =>
        t.name.toLowerCase() === loserName.toLowerCase() ||
        t.shortName.toLowerCase() === loserName.toLowerCase()
    );

    if (winnerEntry) {
      const [winnerId, winnerTeam] = winnerEntry;
      updates[`teams/${leagueId}/${winnerId}/wins`] =
        (winnerTeam.wins || 0) + 1;
      updates[`teams/${leagueId}/${winnerId}/status`] = "ACTIVE";
      updated++;
    } else {
      errors.push(`Winner team not found: ${winnerName}`);
    }

    if (loserEntry) {
      const [loserId] = loserEntry;
      updates[`teams/${leagueId}/${loserId}/status`] = "ELIMINATED";
      updated++;
    } else {
      errors.push(`Loser team not found: ${loserName}`);
    }
  }

  if (Object.keys(updates).length > 0) {
    const dbRef = (await import("firebase/database")).ref(db);
    await update(dbRef, updates);
  }

  return { updated, errors };
}

/**
 * Determine the current tournament round based on game data.
 */
export function getCurrentRound(games: GameScore[]): string {
  if (games.length === 0) return "Pre-Tournament";

  // Find the latest active round
  const roundOrder = [
    "First Four",
    "Round of 64",
    "Round of 32",
    "Sweet 16",
    "Elite 8",
    "Final Four",
    "Championship",
  ];

  const activeRounds = new Set(games.map((g) => g.round));

  // Return the latest round that has games
  for (let i = roundOrder.length - 1; i >= 0; i--) {
    if (activeRounds.has(roundOrder[i])) {
      return roundOrder[i];
    }
  }

  return games[0]?.round || "Tournament";
}

/**
 * Get summary stats for tournament display.
 */
export function getTournamentSummary(games: GameScore[]) {
  const currentRound = getCurrentRound(games);
  const roundGames = games.filter((g) => g.round === currentRound);
  const completedGames = roundGames.filter((g) => g.status === "final").length;
  const liveGames = roundGames.filter((g) => g.status === "live");
  const upcomingGames = roundGames.filter((g) => g.status === "upcoming");
  const totalGames = roundGames.length;

  const nextGame = upcomingGames.length > 0 ? upcomingGames[0] : null;

  return {
    currentRound,
    completedGames,
    totalGames,
    liveGames: liveGames.length,
    nextGame,
  };
}

/**
 * Calculate best case (maximum possible wins) for a player.
 * For each alive team: max remaining wins = 6 - team.wins
 * Best case = current total wins + sum of remaining possible wins
 */
export function calculateBestCase(
  playerTeams: Team[]
): number {
  const aliveTeams = playerTeams.filter((t) => t.status !== "ELIMINATED");
  const currentWins = playerTeams.reduce((sum, t) => sum + (t.wins || 0), 0);
  const maxRemainingWins = aliveTeams.reduce(
    (sum, t) => sum + (6 - (t.wins || 0)),
    0
  );
  return currentWins + maxRemainingWins;
}
