import { GameContext } from "@/context/GameContext";
import { PlayerContext } from "@/context/PlayerContext";
import { SocketContext } from "@/context/SocketContext";
import { useContext } from "react";

export function useTeamCommands() {
  const socket = useContext(SocketContext);
  const playerContext = useContext(PlayerContext);
  const gameContext = useContext(GameContext);
  return {
    joinTeam: (teamId: string) => {
      console.log("joinTeam");
      console.log(gameContext.game);
      console.log(playerContext.player);

      if (!gameContext.game) return;
      if (!playerContext.player) return;
      socket.emit("team:join", {
        gameId: gameContext.game.id,
        teamId,
        playerId: playerContext.player.id,
      });
    },
    kickPlayer: (teamId: string, playerId: string) => {
      if (!gameContext.game) return;
      socket.emit("team:kick", {
        gameId: gameContext.game.id,
        teamId,
        playerId,
      });
    },
    createTeam: (name: string) => {
      if (!gameContext.game) return;
      socket.emit("team:create", {
        gameId: gameContext.game.id,
        name,
      });
    },
    editTeam: ()
    removeTeam: (teamId: string) => {
      if (!gameContext.game) return;
      socket.emit("team:remove", {
        gameId: gameContext.game.id,
        teamId,
      });
    },
  };
}
