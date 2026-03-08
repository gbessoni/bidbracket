import { ref, DatabaseReference } from "firebase/database";
import { getDb } from "./config";

export function leagueRef(leagueId: string): DatabaseReference {
  return ref(getDb(), `leagues/${leagueId}`);
}

export function playersRef(leagueId: string): DatabaseReference {
  return ref(getDb(), `players/${leagueId}`);
}

export function playerRef(leagueId: string, playerId: string): DatabaseReference {
  return ref(getDb(), `players/${leagueId}/${playerId}`);
}

export function teamsRef(leagueId: string): DatabaseReference {
  return ref(getDb(), `teams/${leagueId}`);
}

export function teamRef(leagueId: string, teamId: string): DatabaseReference {
  return ref(getDb(), `teams/${leagueId}/${teamId}`);
}

export function auctionRef(leagueId: string): DatabaseReference {
  return ref(getDb(), `auction/${leagueId}`);
}

export function auctionHistoryRef(leagueId: string): DatabaseReference {
  return ref(getDb(), `auction/${leagueId}/history`);
}

export function codesRef(code: string): DatabaseReference {
  return ref(getDb(), `codes/${code}`);
}

export function tournamentRef(leagueId: string): DatabaseReference {
  return ref(getDb(), `tournament/${leagueId}`);
}

export function serverTimeOffsetRef(): DatabaseReference {
  return ref(getDb(), ".info/serverTimeOffset");
}
