import { Socket } from "socket.io";
import { Logger } from "../../utils/logger";
import { GameService } from "../game/game-service";
import { FinalRoundService } from "./final-round-service";
import { CategoryService } from "../category/category-service";

export const finalRoundController = (
  socket: Socket,
  finalRoundService: FinalRoundService,
  categoryService: CategoryService,
  gameService: GameService
) => {
  const logger = new Logger(["Server", "FinalRoundController"]);

  socket.on("final:round:question:edit", editFinalRound);
  function editFinalRound(dto: { gameId: string, questionId: string }) {
    const game = gameService.getGameById(dto.gameId);
    const finalRound = game.getFinalRound();

    finalRound.finalQuestion = categoryService.getQuestionById(dto.questionId);

    logger
      .context("final:round:edit")
      .log(`Final round edited in game ${game.id}.`);

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }
}