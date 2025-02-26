import { PlayerContext } from "@/context/PlayerContext";
import { SocketContext } from "@/context/SocketContext";
import { useContext } from "react";
import { useLocalStorage } from "../useLocalStorage";
import { Game } from "@/type/Game";
import { GameContext } from "@/context/GameContext";

export function useGameCommands() {
  const socket = useContext(SocketContext);
  const playerContext = useContext(PlayerContext);
  const gameContext = useContext(GameContext);

  const [, setSaveGame, removeSavedGame] = useLocalStorage<Game | null>(
    "game",
    null
  );

  const rejoin = (gameId: string) => {
    if (!playerContext.player) return;
    if (!gameContext.game) return;
    socket.emit("game:rejoin", {
      gameId,
      playerId: playerContext.player?.id,
    });
  };

  return {
    checkIfGameExists: (gameId: string) => {
      socket.emit("game:exists", { gameId }, (doseGameExists: boolean) => {
        if (!doseGameExists) {
          gameContext?.setGame(null);
          removeSavedGame();
        } else {
          rejoin(gameId);
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
      if (!playerContext) return;
      if (!gameContext) return;
      socket.emit(
        "game:join",
        { gameId, playerId: playerContext.player?.id },
        ({ game }: { game: Game }) => {
          gameContext.setGame(game);
          setSaveGame(game);
        }
      );
    },
    rejoin: (gameId: string) => {
      if (!playerContext.player) return;
      if (!gameContext.game) return;
      socket.emit("game:rejoin", {
        gameId,
        playerId: playerContext.player?.id,
      });
    },
    leaveGame: () => {
      if (!playerContext) return;
      if (!gameContext) return;
      socket.emit("game:leave", () => {
        gameContext.setGame(null);
        removeSavedGame();
      });
    },
  };
}
