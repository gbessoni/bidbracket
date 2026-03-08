"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PlayerIdentity } from "@/types";

const STORAGE_KEY = "bidbracket_identity";

interface PlayerContextType {
  identity: PlayerIdentity | null;
  setIdentity: (identity: PlayerIdentity) => void;
  clearIdentity: () => void;
}

const PlayerContext = createContext<PlayerContextType>({
  identity: null,
  setIdentity: () => {},
  clearIdentity: () => {},
});

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [identity, setIdentityState] = useState<PlayerIdentity | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setIdentityState(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoaded(true);
  }, []);

  const setIdentity = (newIdentity: PlayerIdentity) => {
    setIdentityState(newIdentity);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newIdentity));
  };

  const clearIdentity = () => {
    setIdentityState(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!loaded) return null;

  return (
    <PlayerContext.Provider value={{ identity, setIdentity, clearIdentity }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerIdentity() {
  return useContext(PlayerContext);
}
