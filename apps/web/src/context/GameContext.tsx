import { Game } from "@/type/Game";
import { createContext } from "react";

export type GameContextType = {
  game: Game | null;
  setGame: (game: Game | null) => void;
};

export const GameContext = createContext<GameContextType>({
  game: null,
  setGame: () => {},
});
