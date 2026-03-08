import { NextResponse } from "next/server";
import { fetchTournamentScores } from "@/lib/grok/scores";

let cachedScores: { data: unknown; timestamp: number } | null = null;
const CACHE_DURATION = 3 * 60 * 1000; // 3 minutes

export async function GET() {
  // Check cache
  if (cachedScores && Date.now() - cachedScores.timestamp < CACHE_DURATION) {
    return NextResponse.json(cachedScores.data);
  }

  try {
    const scores = await fetchTournamentScores();
    cachedScores = { data: scores, timestamp: Date.now() };
    return NextResponse.json(scores);
  } catch (error) {
    console.error("Scores API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch scores" },
      { status: 500 }
    );
  }
}
