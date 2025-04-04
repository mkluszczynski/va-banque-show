import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { useSocket } from "@/common/socket/useSocket";
import { Player } from "./Player";
import { usePlayer } from "./PlayerContext";
import { useTeamCommands } from "@/team/useTeamCommands";

export function usePlayerCommands() {
  const socket = useSocket();
  const playerContext = usePlayer();
  const { getPlayerTeam } = useTeamCommands();
  const [, setSavePlayer, removeSavedPlayer] = useLocalStorage<Player | null>(
    "player",
    null
  );

  return {
    checkIfPlayerExists: (playerId: string) => {
      socket.emit("player:check", { playerId }, (exists: boolean) => {
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
    isPlayerCapitan: () => {
      const team = getPlayerTeam();
      if (!team?.capitan) return false;
      return team.capitan.id === playerContext.player?.id;
    },
  };
}
