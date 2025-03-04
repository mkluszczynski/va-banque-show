import { GameContext } from "@/context/GameContext";
import { SocketContext } from "@/context/SocketContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Game } from "@/type/Game";
import { useContext, useState } from "react";

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [savedGame, setSaveGame] = useLocalStorage<Game | null>("game", null);
  const [game, setGame] = useState<Game | null>(savedGame);

  const socket = useContext(SocketContext);

  socket.on("update", ({ game }: { game: Game }) => {
    console.log("update", game);

    setGame(game);
    setSaveGame(game);
  });

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
}
