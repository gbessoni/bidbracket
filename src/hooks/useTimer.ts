"use client";

import { useState, useEffect, useRef } from "react";
import { onValue } from "firebase/database";
import { serverTimeOffsetRef } from "@/lib/firebase/database";

interface TimerState {
  secondsLeft: number;
  isUrgent: boolean;
  isExpired: boolean;
  progress: number;
}

const TOTAL_DURATION = 15;

export function useTimer(timerEndsAt: number): TimerState {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_DURATION);
  const offsetRef = useRef(0);

  useEffect(() => {
    const unsubscribe = onValue(serverTimeOffsetRef(), (snapshot) => {
      offsetRef.current = snapshot.val() || 0;
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!timerEndsAt || timerEndsAt === 0) {
      setSecondsLeft(TOTAL_DURATION);
      return;
    }

    const update = () => {
      const serverNow = Date.now() + offsetRef.current;
      const remaining = Math.max(0, Math.ceil((timerEndsAt - serverNow) / 1000));
      setSecondsLeft(remaining);
    };

    update();
    const interval = setInterval(update, 100);
    return () => clearInterval(interval);
  }, [timerEndsAt]);

  return {
    secondsLeft,
    isUrgent: secondsLeft <= 5 && secondsLeft > 0,
    isExpired: secondsLeft <= 0 && timerEndsAt > 0,
    progress: Math.max(0, secondsLeft / TOTAL_DURATION),
  };
}
