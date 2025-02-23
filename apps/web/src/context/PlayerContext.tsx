import { createContext } from "react";
import { Player } from "../type/Player";

type PlayerContextType = {
  player: Player | null;
  setPlayer: (player: Player) => void;
};

export const PlayerContext = createContext<PlayerContextType | null>(null);
