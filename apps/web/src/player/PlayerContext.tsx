import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { createContext, use, useState } from "react";
import { Player } from "./Player";

type PlayerContextType = {
  player: Player | null;
  setPlayer: (player: Player | null) => void;
};

const PlayerContext = createContext<PlayerContextType>({
  player: null,
  setPlayer: () => {},
});

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [savedPlayer] = useLocalStorage<Player | null>("player", null);
  const [player, setPlayer] = useState<Player | null>(savedPlayer);
  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return use(PlayerContext);
}
