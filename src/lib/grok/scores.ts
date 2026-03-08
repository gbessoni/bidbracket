import { queryGrok } from "./client";
import { GameScore } from "@/types";

export async function fetchTournamentScores(): Promise<GameScore[]> {
  const prompt = `Search for the latest 2026 NCAA March Madness tournament game results and scores.
Return ONLY a JSON array with this exact format, no other text or markdown:
[{
  "team1": "Team Name",
  "team2": "Team Name",
  "score1": number or null if not yet played,
  "score2": number or null if not yet played,
  "status": "upcoming" or "live" or "final",
  "round": "First Four" or "Round of 64" or "Round of 32" or "Sweet 16" or "Elite 8" or "Final Four" or "Championship"
}]

If the tournament hasn't started yet or no games have been played, return an empty array: []`;

  try {
    const raw = await queryGrok(prompt);
    return parseScores(raw);
  } catch (error) {
    console.error("Failed to fetch scores from Grok:", error);
    return [];
  }
}

function parseScores(raw: string): GameScore[] {
  try {
    // Strip markdown code block if present
    let cleaned = raw.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const parsed = JSON.parse(cleaned);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item: Record<string, unknown>) => ({
      team1: String(item.team1 || ""),
      team2: String(item.team2 || ""),
      score1: typeof item.score1 === "number" ? item.score1 : null,
      score2: typeof item.score2 === "number" ? item.score2 : null,
      status: (["upcoming", "live", "final"].includes(item.status as string)
        ? item.status
        : "upcoming") as "upcoming" | "live" | "final",
      round: String(item.round || "Round of 64"),
    }));
  } catch {
    console.error("Failed to parse Grok response:", raw);
    return [];
  }
}
