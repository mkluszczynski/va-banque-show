import { useSocket } from "@/common/socket/useSocket";
import { useGame } from "@/game/GameContext";
import { usePlayer } from "@/player/PlayerContext";

export function useTeamCommands() {
  const socket = useSocket();
  const playerContext = usePlayer();
  const gameContext = useGame();
  return {
    getPlayerTeam: () => {
      if (!gameContext.game) return;
      if (!playerContext.player) return;
      const playerTeam = gameContext.game.teams.find((team) =>
        team.players.some((player) => player.id === playerContext.player?.id)
      );
      return playerTeam || null;
    },
    joinTeam: (teamId: string) => {
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
    editTeam: (teamId: string, name: string, score: number) => {
      if (!gameContext.game) return;
      socket.emit("team:edit", {
        gameId: gameContext.game.id,
        teamId,
        name,
        score,
      });
    },
    removeTeam: (teamId: string) => {
      if (!gameContext.game) return;
      socket.emit("team:remove", {
        gameId: gameContext.game.id,
        teamId,
      });
    },
    movePlayer: (teamId: string, playerId: string) => {
      if (!gameContext.game) return;
      socket.emit("team:join", {
        gameId: gameContext.game.id,
        teamId,
        playerId: playerId,
      });
    },
  };
}
