import { GameContext } from "@/context/GameContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Game } from "@/type/Game";
import { useState } from "react";
import { Socket } from "socket.io-client";

export function GameProvider({
  children,
  socket,
}: {
  children: React.ReactNode;
  socket: Socket;
}) {
  const [savedGame, setSaveGame] = useLocalStorage<Game | null>("game", null);
  const [game, setGame] = useState<Game | null>(savedGame);

  // const socket = useContext(SocketContext);

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
