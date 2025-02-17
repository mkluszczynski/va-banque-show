import { Socket } from "socket.io";
import { JoinGameDto } from "./dto/join-game-dto";
import { Game } from "./game";
import { GameService } from "./game-service";
import { RoundService } from "../round/round-service";
import { CategoryService } from "../category/category-service";
import { PlayerService } from "../player/player-service";
import { CreateGameDto } from "./dto/cerate-game-dto";
import { TeamService } from "../team/team-service";

export const gameController = (
  socket: Socket,
  gameService: GameService,
  roundService: RoundService,
  categoryService: CategoryService,
  playerService: PlayerService,
  teamService: TeamService
) => {
  socket.on("game:join", joinGame);
  function joinGame(data: JoinGameDto, callback: CallableFunction) {
    if (!data.gameId || !data.playerId) {
      console.log("[Server][gameController] Invalid game data.");
      socket.emit("error", { message: "Invalid data" });
      return;
    }

    const game = gameService.getGameById(data.gameId);
    if (!game) {
      console.log("[Server][gameController] Game not found.");
      socket.emit("error", { gameId: data.gameId });
      return;
    }

    const player = playerService.getPlayerById(data.playerId);
    if (!player) {
      console.log("[Server][gameController] Player not found.");
      socket.emit("error", { playerId: data.playerId });
      return;
    }

    game.addPlayer(player);

    callback({ game });
    console.log(
      `[Server][gameController] Player ${player.nickname}#${player.id} joined game: ${game.id}`
    );

    socket.join(game.id);
    socket.broadcast.to(game.id).emit("update", { game });
  }

  socket.on("game:create", createGame);
  function createGame(dto: CreateGameDto, callback: CallableFunction) {
    const admin = playerService.getPlayerById(dto.adminId);
    if (!admin) {
      console.log("[Server][gameController] Admin not found.");
      socket.emit("error", { message: "Admin not found" });
      return;
    }

    const game: Game = gameService.createGame(admin);

    game.addRound(roundService.createRound(1));
    game.addRound(roundService.createRound(2));

    game.addTeam(teamService.createTeam("Team 1"));
    game.addTeam(teamService.createTeam("Team 2"));

    console.log(`[Server][gameController] Game created: ${game.id}`);
    callback({ game });
    socket.join(game.id);
    socket.broadcast.to(game.id).emit("update", { game });
  }
};
