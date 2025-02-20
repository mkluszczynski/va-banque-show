import { Socket } from "socket.io";
import { JoinTeamDto } from "./dto/join-team-dto";
import { GameService } from "../game/game-service";
import { PlayerService } from "../player/player-service";
import { TeamService } from "./team-service";
import { CreateTeamDto } from "./dto/create-team-dto";
import { RemoveTeamDto } from "./dto/remove-team-dto";

export const teamController = (
  socket: Socket,
  gameService: GameService,
  playerService: PlayerService,
  teamService: TeamService
) => {
  socket.on("team:create", createTeam);
  function createTeam(dto: CreateTeamDto) {
    const game = gameService.getGameById(dto.gameId);
    const team = teamService.createTeam(dto.name);

    game.addTeam(team);

    socket.broadcast.to(game.id).emit("update", { game });
  }

  socket.on("team:remove", removeTeam);
  function removeTeam(dto: RemoveTeamDto) {
    const game = gameService.getGameById(dto.gameId);
    const team = teamService.getTeamById(dto.teamId);

    game.removeTeam(team);
    teamService.removeTeam(team);

    console.log(
      `[Server][teamController][${game.id}] Team ${team.id} removed.`
    );
    socket.to(game.id).emit("update", { game });
  }

  socket.on("team:join", joinTeam);
  function joinTeam(dto: JoinTeamDto) {
    const game = gameService.getGameById(dto.gameId);
    const player = playerService.getPlayerById(dto.playerId);
    const team = teamService.getTeamById(dto.teamId);


    teamService.addPlayerToTeam(player, team);

    console.log(
      `[Server][teamController] Player ${player.nickname}#${player.id} joined team: ${team.id}`
    );
    socket.to(game.id).emit("update", { game });
  }
};
