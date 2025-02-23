import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { Player } from "../type/Player";
import { PlayerContext } from "../context/PlayerContext";
import { useLocalStorage } from "./useLocalStorage";

export function useCommands() {
  const socket = useContext(SocketContext);
  const playerContext = useContext(PlayerContext);
  const [, setSavePlayer] = useLocalStorage<Player | null>("player", null);

  return {
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
  };
}
