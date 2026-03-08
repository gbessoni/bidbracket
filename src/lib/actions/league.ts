import { ref, set, get, update, serverTimestamp } from "firebase/database";
import { getDb } from "@/lib/firebase/config";
import { generateInviteCode } from "@/lib/utils/generateCode";
import { v4 as uuidv4 } from "uuid";
import { PlayerIdentity } from "@/types";

export async function createLeague(
  playerName: string,
  age: number,
  leagueName: string
): Promise<PlayerIdentity> {
  const db = getDb();
  const leagueId = uuidv4();
  const playerId = uuidv4();
  const code = generateInviteCode();

  const updates: Record<string, unknown> = {};

  updates[`leagues/${leagueId}`] = {
    name: leagueName,
    code,
    adminId: playerId,
    status: "LOBBY",
    createdAt: serverTimestamp(),
  };

  updates[`players/${leagueId}/${playerId}`] = {
    name: playerName,
    age,
    budget: 100,
    teams: {},
    totalWins: 0,
    isAdmin: true,
    joinedAt: serverTimestamp(),
  };

  updates[`codes/${code}`] = leagueId;

  await update(ref(db), updates);

  return {
    playerId,
    playerName,
    leagueId,
    isAdmin: true,
  };
}

export async function joinLeague(
  playerName: string,
  age: number,
  inviteCode: string
): Promise<PlayerIdentity> {
  const db = getDb();
  const code = inviteCode.toUpperCase();

  const codeSnap = await get(ref(db, `codes/${code}`));
  if (!codeSnap.exists()) {
    throw new Error("Invalid invite code");
  }

  const leagueId = codeSnap.val() as string;

  const leagueSnap = await get(ref(db, `leagues/${leagueId}/status`));
  if (!leagueSnap.exists() || leagueSnap.val() !== "LOBBY") {
    throw new Error("This league is no longer accepting players");
  }

  const playerId = uuidv4();

  await set(ref(db, `players/${leagueId}/${playerId}`), {
    name: playerName,
    age,
    budget: 100,
    teams: {},
    totalWins: 0,
    isAdmin: false,
    joinedAt: serverTimestamp(),
  });

  return {
    playerId,
    playerName,
    leagueId,
    isAdmin: false,
  };
}

export async function rejoinLeague(
  playerName: string,
  inviteCode: string
): Promise<PlayerIdentity> {
  const db = getDb();
  const code = inviteCode.toUpperCase();

  const codeSnap = await get(ref(db, `codes/${code}`));
  if (!codeSnap.exists()) {
    throw new Error("Invalid invite code");
  }

  const leagueId = codeSnap.val() as string;

  // Find the player by name
  const playersSnap = await get(ref(db, `players/${leagueId}`));
  if (!playersSnap.exists()) {
    throw new Error("No players found in this league");
  }

  const players = playersSnap.val() as Record<string, { name: string; isAdmin: boolean }>;
  const match = Object.entries(players).find(
    ([, p]) => p.name.toLowerCase() === playerName.trim().toLowerCase()
  );

  if (!match) {
    throw new Error("No player with that name found in this league");
  }

  const [playerId, player] = match;

  // Check if this player is the league admin
  const leagueSnap = await get(ref(db, `leagues/${leagueId}/adminId`));
  const isAdmin = leagueSnap.exists() && leagueSnap.val() === playerId;

  return {
    playerId,
    playerName: player.name,
    leagueId,
    isAdmin,
  };
}
