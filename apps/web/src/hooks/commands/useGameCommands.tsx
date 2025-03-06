import { GameContext } from "@/context/GameContext";
import { PlayerContext } from "@/context/PlayerContext";
import { SocketContext } from "@/context/SocketContext";
import { Game } from "@/type/Game";
import { useContext } from "react";
import { useLocalStorage } from "../useLocalStorage";

export function useGameCommands() {
  const socket = useContext(SocketContext);
  const playerContext = useContext(PlayerContext);
  const gameContext = useContext(GameContext);

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
  };
}
