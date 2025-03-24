import { useSocket } from "@/common/socket/useSocket";
import { useGame } from "@/game/GameContext";

export function useRoundCommands() {
  const socket = useSocket();
  const gameContext = useGame();

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
    },
    addCategoryToRound: (roundId: string, categoryId: string) => {
      if (!gameContext.game) return;

      socket.emit("game:round:category:add", {
        gameId: gameContext.game?.id,
        roundId,
        categoryId,
      });
    },
    removeCategoryFromRound: (roundId: string, categoryId: string) => {
      if (!gameContext.game) return;

      socket.emit("game:round:category:remove", {
        gameId: gameContext.game?.id,
        roundId,
        categoryId,
      });
    },
    setFinalRoundQuestion: (questionId: string) => {
      if (!gameContext.game) return;

      socket.emit("final:round:question:edit", {
        gameId: gameContext.game?.id,
        questionId,
      });
    },
  };
}
