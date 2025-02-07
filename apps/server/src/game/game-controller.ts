import { Socket } from "socket.io";
import { JoinGameDto } from "./dto/join-game-dto";
import { Game } from "./game";
import { GameService } from "./game-service";

export const gameController = (socket: Socket, gameService: GameService) => {
  socket.on("game:join", joinGame);
  function joinGame(data: JoinGameDto) {
    if (!data.gameId || !data.playerId) {
      console.log("[Server][gameController] Invalid game data.");
      socket.emit("error", { message: "Invalid data" });
      return;
    }

    const game: Game = gameService.joinGame(data);
    socket.emit("game:join:success", { game });
  }

  socket.on("game:create", createGame);
  function createGame() {
    const game: Game = gameService.createGame();
    socket.emit("game:create:success", { game });
  }
};
