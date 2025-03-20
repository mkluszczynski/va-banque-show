import { useSocket } from "@/common/socket/useSocket";
import { Game } from "@/game/Game";
import { createContext, use, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export type GameContextType = {
  game: Game | null;
  setGame: (game: Game | null) => void;
};

const GameContext = createContext<GameContextType>({
  game: null,
  setGame: () => {},
});

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [savedGame, setSaveGame] = useLocalStorage<Game | null>("game", null);
  const [game, setGame] = useState<Game | null>(savedGame);

  const socket = useSocket();

  socket.on("update", ({ game }: { game: Game }) => {
    setGame(game);
    setSaveGame(game);
  });

  socket.on("game:closed", () => {
    setGame(null);
    setSaveGame(null);
  });

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  return use(GameContext);
};
