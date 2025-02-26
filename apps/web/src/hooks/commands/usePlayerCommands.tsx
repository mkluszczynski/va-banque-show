import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import { Player } from "../../type/Player";
import { PlayerContext } from "../../context/PlayerContext";
import { useLocalStorage } from "../useLocalStorage";

export function usePlayerCommands() {
  const socket = useContext(SocketContext);
  const playerContext = useContext(PlayerContext);
  const [, setSavePlayer, removeSavedPlayer] = useLocalStorage<Player | null>(
    "player",
    null
  );

  return {
    checkIfPlayerExists: (playerId: string) => {
      socket.emit("player:exists", { playerId }, (exists: boolean) => {
        if (exists) return;
        if (!playerContext) return;

        playerContext.setPlayer(null);
        removeSavedPlayer();
      });
    },
    registerPlayer: (nickname: string) => {
      socket.emit(
        "player:register",
        { nickname },
        ({ player }: { player: Player }) => {
          if (!playerContext) return;
          playerContext.setPlayer(player);
          setSavePlayer(player);
        }
      );
    },
    logout: () => {
      if (!playerContext) return;
      playerContext.setPlayer(null);
      removeSavedPlayer();
    },
    editPlayer: (nickname: string) => {
      if (!playerContext) return;
      socket.emit(
        "player:edit",
        { nickname },
        ({ player }: { player: Player }) => {
          playerContext.setPlayer(player);
          setSavePlayer(player);
        }
      );
    },
  };
}
