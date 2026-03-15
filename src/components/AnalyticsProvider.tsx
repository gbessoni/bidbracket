"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/firebase/config";

export default function AnalyticsProvider() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return null;
}
