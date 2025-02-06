import { Socket } from "socket.io";
import { JoinGameDto } from "./dto/join-game-dto";
import { Game } from "./game";
import { GameService } from "./game-service";

export const gameController = (socket: Socket, gameService: GameService) => {
  const joinGame = (data: JoinGameDto) => {
    if (!data.gameId || !data.playerId) {
      console.log("[Server][gameController] Invalid game data.");
      socket.emit("error", { message: "Invalid data" });
      return;
    }

    const game: Game = gameService.joinGame(data);
    socket.emit("gameJoined", { game });
  };
  socket.on("game:join", joinGame);
};
