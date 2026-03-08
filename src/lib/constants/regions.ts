import { Region } from "@/types";

export const REGIONS: Region[] = ["East", "West", "South", "Midwest"];

export const REGION_COLORS: Record<Region, string> = {
  East: "#3b82f6",
  West: "#ef4444",
  South: "#f59e0b",
  Midwest: "#8b5cf6",
};

export const REGION_BG_CLASSES: Record<Region, string> = {
  East: "bg-blue-500/20 text-blue-400",
  West: "bg-red-500/20 text-red-400",
  South: "bg-amber-500/20 text-amber-400",
  Midwest: "bg-purple-500/20 text-purple-400",
};
