import { Socket } from "socket.io";
import { JoinTeamDto } from "./dto/join-team-dto";
import { GameService } from "../game/game-service";
import { PlayerService } from "../player/player-service";
import { TeamService } from "./team-service";
import { createTeamDto } from "./dto/create-team-dto";
import { RemoveTeamDto } from "./dto/remove-team-dto";
import { ShowTeamDto } from "./dto/show-team-dto";

export const teamController = (
  socket: Socket,
  gameService: GameService,
  playerService: PlayerService,
  teamService: TeamService
) => {
  socket.on("team:create", createTeam);
  function createTeam(dto: createTeamDto) {
    if (!dto.gameId || !dto.name) {
      console.log("[Server][teamController] Invalid game data.");
      socket.emit("error", { message: "Invalid data" });
      return;
    }

    const game = gameService.getGameById(dto.gameId);

    if (!game) {
      console.log("[Server][teamController] Game not found.");
      socket.emit("error", { gameId: dto.gameId });
      return;
    }

    const team = teamService.createTeam(dto.name);

    game.addTeam(team);
    socket.emit("team:create:success", { team });
  }

  socket.on("team:remove", removeTeam);
  function removeTeam(dto: RemoveTeamDto) {
    const { gameId, teamId } = dto;

    if (!gameId || !teamId) {
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

    if (game.doseTeamExist(teamId)) game.removeTeamById(teamId);
    if (teamService.doseTeamExist(teamId)) teamService.removeTeamById(teamId);
    socket.emit("team:remove:success");
  }

  socket.on("team:show", showTeam);
  function showTeam(dto: ShowTeamDto, callback: CallableFunction) {
    if (!dto.gameId) {
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

    callback({ teams: game.teams });
    // socket.to(game.id).emit("update", { game });
  }

  socket.on("team:join", joinTeam);
  function joinTeam(dto: JoinTeamDto) {
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
    if (!team || !game.doseTeamExist(team.id)) {
      console.log("[Server][teamController] Team not found.");
      socket.emit("teamNotFound", { teamId: dto.teamId });
      return;
    }

    if (!game.doseTeamExist(team.id)) {
      console.log("[Server][teamController] Team already joined a game.");
      socket.emit("teamAlreadyJoined", { teamId: team.id });
      return;
    }

    if (team.dosePlayerExist(player.id)) {
      console.log("[Server][teamController] Player already joined this team.");
      socket.emit("playerAlreadyJoined", { playerId: player.id });
      return;
    }

    if (teamService.isPlayerAlreadyInTeam(player.id)) {
      const playerTeam = teamService.getTeamByPlayerId(player.id);
      if (!playerTeam) return;
      playerTeam.removePlayerById(player.id);
    }

    team.addPlayer(player);
    console.log(
      `[Server][teamController] Player ${player.nickname}#${player.id} joined team: ${team.id}`
    );
    socket.to(game.id).emit("update", { game });
  }
};
