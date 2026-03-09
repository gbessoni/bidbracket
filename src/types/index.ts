export type LeagueStatus = "LOBBY" | "DRAFTING" | "TOURNAMENT";
export type TeamStatus = "AVAILABLE" | "DRAFTED" | "ELIMINATED" | "ACTIVE" | "CHAMPION";
export type AuctionPhase = "NOMINATION" | "BIDDING" | "PAUSED" | "COMPLETE";
export type Region = "East" | "West" | "South" | "Midwest";
export type TournamentRound =
  | "FIRST_FOUR"
  | "ROUND_OF_64"
  | "ROUND_OF_32"
  | "SWEET_16"
  | "ELITE_8"
  | "FINAL_FOUR"
  | "CHAMPIONSHIP";

export interface League {
  id: string;
  name: string;
  code: string;
  adminId: string;
  status: LeagueStatus;
  createdAt: number;
}

export interface Player {
  id: string;
  name: string;
  age: number;
  budget: number;
  teams: Record<string, { cost: number; draftOrder: number }>;
  totalWins: number;
  isAdmin: boolean;
  joinedAt: number;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  seed: number;
  region: Region;
  espnId: number;
  logoUrl: string;
  status: TeamStatus;
  ownerId: string | null;
  ownerName: string | null;
  cost: number | null;
  draftOrder: number | null;
  wins: number;
  isFirstFour: boolean;
  record: string | null;
}

export interface AuctionState {
  phase: AuctionPhase;
  nominatorId: string;
  nominatorIndex: number;
  turnOrder: string[];
  currentTeamId: string | null;
  currentBid: number;
  highBidderId: string | null;
  highBidderName: string | null;
  timerEndsAt: number;
  roundNumber: number;
  totalTeamsDrafted: number;
}

export interface DraftHistoryEntry {
  id?: string;
  teamId: string;
  teamName: string;
  teamSeed: number;
  teamRegion: Region;
  winnerId: string;
  winnerName: string;
  cost: number;
  round: number;
  timestamp: number;
}

export interface PlayerIdentity {
  playerId: string;
  playerName: string;
  leagueId: string;
  isAdmin: boolean;
}

export interface TournamentStanding {
  playerId: string;
  name: string;
  totalWins: number;
  teamsAlive: number;
  totalTeams: number;
  pointsSpent: number;
}

export interface GameScore {
  team1: string;
  team2: string;
  score1: number | null;
  score2: number | null;
  status: "upcoming" | "live" | "final";
  round: string;
}
