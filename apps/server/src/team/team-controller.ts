import { Socket } from "socket.io";
import { JoinTeamDto } from "./dto/join-team-dto";
import { GameService } from "../game/game-service";
import { PlayerService } from "../player/player-service";
import { TeamService } from "./team-service";
import { CreateTeamDto } from "./dto/create-team-dto";
import { RemoveTeamDto } from "./dto/remove-team-dto";
import { Logger } from "../../utils/logger";
import { EditTeamDto } from "./dto/edit-team-dto";

export const teamController = (
  socket: Socket,
  gameService: GameService,
  playerService: PlayerService,
  teamService: TeamService
) => {

  const logger = new Logger(["Server", "TeamController"]);

  socket.on("team:create", createTeam);
  function createTeam(dto: CreateTeamDto) {
    const game = gameService.getGameById(dto.gameId);
    const team = teamService.createTeam(dto.name);

    game.addTeam(team);

    logger
      .context("team:create")
      .context(game.id)
      .log(`Team ${team.id} created`);

    socket.broadcast.to(game.id).emit("update", { game });
  }

  socket.on("team:remove", removeTeam);
  function removeTeam(dto: RemoveTeamDto) {
    const game = gameService.getGameById(dto.gameId);
    const team = teamService.getTeamById(dto.teamId);

    game.removeTeam(team);
    teamService.removeTeam(team);

    logger
      .context("team:remove")
      .context(game.id)
      .log(`Team ${team.id} removed`);

    socket.to(game.id).emit("update", { game });
  }

  socket.on("team:join", joinTeam);
  function joinTeam(dto: JoinTeamDto) {
    const game = gameService.getGameById(dto.gameId);
    const player = playerService.getPlayerById(dto.playerId);
    const team = teamService.getTeamById(dto.teamId);


    teamService.addPlayerToTeam(player, team);


    logger
      .context("team:join")
      .context(game.id)
      .log(`Player ${player.nickname}#${player.id} joined team: ${team.id}`);

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }

  socket.on("team:kick", kickPlayer);
  function kickPlayer(dto: JoinTeamDto) {
    const game = gameService.getGameById(dto.gameId);
    const player = playerService.getPlayerById(dto.playerId);
    const team = teamService.getTeamById(dto.teamId);

    teamService.removePlayerFromTeam(player, team);

    logger
      .context("team:kick")
      .context(game.id)
      .log(`Player ${player.nickname}#${player.id} kicked from team: ${team.id}`);

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }


  socket.on("team:edit", editTeam);
  function editTeam(dto: EditTeamDto) {
    const game = gameService.getGameById(dto.gameId);
    const team = teamService.getTeamById(dto.teamId);

    team.name = dto.name;
    team.score = dto.score;

    logger
      .context("team:edit")
      .context(game.id)
      .log(`Team ${team.id} edited`);

    socket.to(game.id).emit("update", { game });
  }
};
