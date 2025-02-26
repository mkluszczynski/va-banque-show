import { PlayerContext } from "@/context/PlayerContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Player } from "@/type/Player";
import { useState } from "react";

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [savedPlayer] = useLocalStorage<Player | null>("player", null);
  const [player, setPlayer] = useState<Player | null>(savedPlayer);
  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}
