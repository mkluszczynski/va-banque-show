import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { useSocket } from "@/common/socket/useSocket";
import { Game } from "@/game/Game";
import { useGame } from "@/game/GameContext";
import { usePlayer } from "@/player/PlayerContext";

export function useGameCommands() {
  const socket = useSocket();
  const playerContext = usePlayer();
  const gameContext = useGame();

  const [, setSaveGame, removeSavedGame] = useLocalStorage<Game | null>(
    "game",
    null
  );

  return {
    checkIfGameExists: (gameId: string) => {
      socket.emit("game:exists", { gameId }, (doseGameExists: boolean) => {
        if (!doseGameExists) {
          gameContext?.setGame(null);
          removeSavedGame();
        }
      });
    },
    createGame: () => {
      if (!playerContext) return;
      if (!gameContext) return;
      socket.emit(
        "game:create",
        { adminId: playerContext.player?.id },
        ({ game }: { game: Game }) => {
          gameContext.setGame(game);
          setSaveGame(game);
        }
      );
    },
    joinGame: (gameId: string) => {
      if (!playerContext.player) return;
      socket.emit(
        "game:join",
        { gameId, playerId: playerContext.player.id },
        ({ game }: { game: Game }) => {
          gameContext.setGame(game);
          setSaveGame(game);
        }
      );
    },
    rejoin: () => {
      if (!playerContext.player) return;
      if (!gameContext.game) return;

      console.log("rejoin");
      socket.emit("game:rejoin", {
        gameId: gameContext.game.id,
        playerId: playerContext.player?.id,
      });
    },
    leaveGame: () => {
      if (!playerContext) return;
      if (!gameContext) return;
      socket.emit("game:leave", {
        gameId: gameContext.game?.id,
        playerId: playerContext.player?.id,
      });
      gameContext.setGame(null);
      removeSavedGame();
    },
    selectRound: (roundId: string) => {
      if (!gameContext.game) return;
      socket.emit("game:round:select", {
        gameId: gameContext.game.id,
        roundId,
      });
    },
    selectQuestion: (questionId: string) => {
      if (!gameContext.game) return;
      socket.emit("game:question:select", {
        gameId: gameContext.game.id,
        questionId,
      });
    },
  };
}
