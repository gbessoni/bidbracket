import { ref, get, update, runTransaction, push, serverTimestamp } from "firebase/database";
import { getDb } from "@/lib/firebase/config";
import { NCAA_TEAMS, getTeamLogoUrl } from "@/lib/constants/teams";
import { AuctionState } from "@/types";

const TIMER_DURATION = 15000; // 15 seconds

export async function startDraft(leagueId: string, playerId: string) {
  const db = getDb();

  const leagueSnap = await get(ref(db, `leagues/${leagueId}`));
  if (!leagueSnap.exists()) throw new Error("League not found");

  const league = leagueSnap.val();
  if (league.adminId !== playerId) throw new Error("Only admin can start draft");
  if (league.status !== "LOBBY") throw new Error("Draft already started");

  const playersSnap = await get(ref(db, `players/${leagueId}`));
  if (!playersSnap.exists()) throw new Error("No players found");

  const playerIds = Object.keys(playersSnap.val());
  if (playerIds.length < 2) throw new Error("Need at least 2 players");

  // Shuffle turn order
  const turnOrder = [...playerIds].sort(() => Math.random() - 0.5);

  const updates: Record<string, unknown> = {};

  // Seed all 68 teams
  for (const team of NCAA_TEAMS) {
    updates[`teams/${leagueId}/${team.id}`] = {
      name: team.name,
      shortName: team.shortName,
      seed: team.seed,
      region: team.region,
      espnId: team.espnId,
      logoUrl: getTeamLogoUrl(team.espnId),
      status: "AVAILABLE",
      ownerId: null,
      ownerName: null,
      cost: null,
      draftOrder: null,
      wins: 0,
      isFirstFour: team.isFirstFour,
      record: team.record,
    };
  }

  // Initialize auction state
  updates[`auction/${leagueId}`] = {
    phase: "NOMINATION",
    nominatorId: turnOrder[0],
    nominatorIndex: 0,
    turnOrder,
    currentTeamId: null,
    currentBid: 0,
    highBidderId: null,
    highBidderName: null,
    timerEndsAt: 0,
    roundNumber: 1,
    totalTeamsDrafted: 0,
  };

  updates[`leagues/${leagueId}/status`] = "DRAFTING";

  await update(ref(db), updates);
}

export async function nominateTeam(
  leagueId: string,
  teamId: string,
  startingBid: number,
  playerId: string,
  playerName: string
) {
  const db = getDb();
  const timerEndsAt = Date.now() + TIMER_DURATION;

  const updates: Record<string, unknown> = {};
  updates[`auction/${leagueId}/phase`] = "BIDDING";
  updates[`auction/${leagueId}/currentTeamId`] = teamId;
  updates[`auction/${leagueId}/currentBid`] = startingBid;
  updates[`auction/${leagueId}/highBidderId`] = playerId;
  updates[`auction/${leagueId}/highBidderName`] = playerName;
  updates[`auction/${leagueId}/timerEndsAt`] = timerEndsAt;

  await update(ref(db), updates);
}

export async function placeBid(
  leagueId: string,
  playerId: string,
  playerName: string,
  bidAmount: number,
  playerBudget: number
) {
  const db = getDb();
  const auctionNodeRef = ref(db, `auction/${leagueId}`);

  const result = await runTransaction(auctionNodeRef, (current: AuctionState | null) => {
    if (!current) return current;
    if (current.phase !== "BIDDING") return undefined;
    if (bidAmount <= current.currentBid) return undefined;
    if (current.highBidderId === playerId) return undefined;
    if (bidAmount > playerBudget) return undefined;

    return {
      ...current,
      currentBid: bidAmount,
      highBidderId: playerId,
      highBidderName: playerName,
      timerEndsAt: Date.now() + TIMER_DURATION,
    };
  });

  if (!result.committed) {
    throw new Error("Bid failed - you may have been outbid");
  }
}

export async function finalizePick(leagueId: string) {
  const db = getDb();

  const auctionSnap = await get(ref(db, `auction/${leagueId}`));
  if (!auctionSnap.exists()) return;

  const auction = auctionSnap.val() as AuctionState;
  if (auction.phase !== "BIDDING") return;
  if (Date.now() < auction.timerEndsAt) return;

  const teamId = auction.currentTeamId!;
  const winnerId = auction.highBidderId!;
  const winnerName = auction.highBidderName!;
  const cost = auction.currentBid;

  // Get team info for history
  const teamSnap = await get(ref(db, `teams/${leagueId}/${teamId}`));
  const team = teamSnap.val();

  // Get winner's current budget
  const winnerSnap = await get(ref(db, `players/${leagueId}/${winnerId}`));
  const winner = winnerSnap.val();

  const newBudget = winner.budget - cost;
  const totalDrafted = (auction.totalTeamsDrafted || 0) + 1;

  // Advance to next nominator, skipping players with $0 budget
  const turnOrder = auction.turnOrder || [];
  const playersSnap = await get(ref(db, `players/${leagueId}`));
  const allPlayers = playersSnap.val() as Record<string, { budget: number }>;
  // Apply winner's new budget for the skip check
  allPlayers[winnerId].budget = newBudget;

  let nextIndex = ((auction.nominatorIndex || 0) + 1) % turnOrder.length;
  let nextNominatorId = turnOrder[nextIndex];
  let checked = 0;
  while (checked < turnOrder.length) {
    if ((allPlayers[turnOrder[nextIndex]]?.budget ?? 0) > 0) break;
    nextIndex = (nextIndex + 1) % turnOrder.length;
    nextNominatorId = turnOrder[nextIndex];
    checked++;
  }

  // Count how many players still have money
  const playersWithMoney = turnOrder.filter(
    (pid) => (allPlayers[pid]?.budget ?? 0) > 0
  ).length;

  // Draft ends if: all teams drafted, all broke, or only 1 player has money (no auction possible)
  const isComplete = totalDrafted >= NCAA_TEAMS.length || playersWithMoney < 2;

  const updates: Record<string, unknown> = {};

  // Update team
  updates[`teams/${leagueId}/${teamId}/status`] = "DRAFTED";
  updates[`teams/${leagueId}/${teamId}/ownerId`] = winnerId;
  updates[`teams/${leagueId}/${teamId}/ownerName`] = winnerName;
  updates[`teams/${leagueId}/${teamId}/cost`] = cost;
  updates[`teams/${leagueId}/${teamId}/draftOrder`] = totalDrafted;

  // Update player budget and teams
  updates[`players/${leagueId}/${winnerId}/budget`] = newBudget;
  updates[`players/${leagueId}/${winnerId}/teams/${teamId}`] = {
    cost,
    draftOrder: totalDrafted,
  };

  // Update auction state
  if (isComplete) {
    updates[`auction/${leagueId}/phase`] = "COMPLETE";
    updates[`leagues/${leagueId}/status`] = "TOURNAMENT";
  } else {
    updates[`auction/${leagueId}/phase`] = "NOMINATION";
    updates[`auction/${leagueId}/nominatorId`] = nextNominatorId;
    updates[`auction/${leagueId}/nominatorIndex`] = nextIndex;
    updates[`auction/${leagueId}/roundNumber`] = Math.floor(totalDrafted / turnOrder.length) + 1;
  }

  updates[`auction/${leagueId}/currentTeamId`] = null;
  updates[`auction/${leagueId}/currentBid`] = 0;
  updates[`auction/${leagueId}/highBidderId`] = null;
  updates[`auction/${leagueId}/highBidderName`] = null;
  updates[`auction/${leagueId}/timerEndsAt`] = 0;
  updates[`auction/${leagueId}/totalTeamsDrafted`] = totalDrafted;

  await update(ref(db), updates);

  // Add to history (after main update for consistency)
  const historyEntry = {
    teamId,
    teamName: team.name,
    teamSeed: team.seed,
    teamRegion: team.region,
    winnerId,
    winnerName,
    cost,
    round: Math.floor(totalDrafted / turnOrder.length) + 1,
    timestamp: Date.now(),
  };

  await push(ref(db, `auction/${leagueId}/history`), historyEntry);
}
