import { Socket } from "socket.io";
import { GameService } from "../game/game-service";
import { AddRoundDto } from "./dto/add-round-dto";
import { Game } from "../game/game";
import { RoundService } from "./round-service";
import { RemoveRoundDto } from "./dto/remove-round-dto";
import { Round } from "./round";

export const roundController = (
  socket: Socket,
  roundService: RoundService,
  gameService: GameService,
) => {
  socket.on("game:round:add", addRound);
  function addRound(dto: AddRoundDto) {
    const game: Game = gameService.getGameById(dto.gameId);

    const round: Round = roundService.createRound(dto.multiplier);

    game.addRound(round);

    socket.broadcast.to(game.id).emit("update", { game });
  }

  socket.on("game:round:remove", deleteRound);
  function deleteRound(dto: RemoveRoundDto) {
    const game: Game = gameService.getGameById(dto.gameId);

    const round = roundService.getRoundById(dto.roundId);

    game.removeRound(round);
    roundService.deleteRound(round);

    socket.broadcast.to(game.id).emit("update", { game });
  }
};
