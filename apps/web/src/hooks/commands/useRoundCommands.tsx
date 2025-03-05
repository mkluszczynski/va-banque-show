import { GameContext } from "@/context/GameContext";
import { SocketContext } from "@/context/SocketContext";
import { useContext } from "react";

export function useRoundCommands() {
  const socket = useContext(SocketContext);
  const gameContext = useContext(GameContext);

  return {
    createRound: () => {
      if (!gameContext.game) return;

      socket.emit("game:round:add", {
        gameId: gameContext.game?.id,
        multiplier: 1,
      });
    },
    removeRound: (roundId: string) => {
      if (!gameContext.game) return;

      socket.emit("game:round:remove", {
        gameId: gameContext.game?.id,
        roundId,
      });
      console.log("remove round");
    },
  };
}
