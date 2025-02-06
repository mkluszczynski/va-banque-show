import { Socket } from "socket.io";
import { JoinTeamDto } from "./dto/join-team-dto";
import { GameService } from "../game/game-service";
import { PlayerService } from "../player/player-service";
import { TeamService } from "./team-service";

export const teamController = (
  socket: Socket,
  gameService: GameService,
  playerService: PlayerService,
  teamService: TeamService
) => {
  const joinTeam = (dto: JoinTeamDto) => {
    if (!dto.gameId || !dto.playerId || !dto.teamId) {
      console.log("[Server][teamController] Invalid team data.");
      socket.emit("error", { message: "Invalid data" });
      return;
    }

    const game = gameService.getGameById(dto.gameId);
    if (!game) {
      console.log("[Server][teamController] Game not found.");
      socket.emit("gameNotFound", { gameId: dto.gameId });
      return;
    }

    const player = playerService.getPlayerById(dto.playerId);
    if (!player) {
      console.log("[Server][teamController] Player not found.");
      socket.emit("playerNotFound", { playerId: dto.playerId });
      return;
    }

    const team = teamService.getTeamById(dto.teamId);
    if (!team || game.doseTeamExist(team.id)) {
      console.log("[Server][teamController] Team not found.");
      socket.emit("teamNotFound", { teamId: dto.teamId });
      return;
    }

    team.addPlayer(player);
    socket.emit("teamJoined", { team });
  };
  socket.on("team:join", joinTeam);
};
