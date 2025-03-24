import { Socket } from "socket.io";
import { GameService } from "../game/game-service";
import { AddRoundDto } from "./dto/add-round-dto";
import { Game } from "../game/game";
import { RoundService } from "./round-service";
import { RemoveRoundDto } from "./dto/remove-round-dto";
import { Round } from "./round";
import { Logger } from "../../utils/logger";

export const roundController = (
  socket: Socket,
  roundService: RoundService,
  gameService: GameService,
) => {

  const logger = new Logger(["Server", "RoundController"]);

  socket.on("game:round:add", addRound);
  function addRound(dto: AddRoundDto) {
    const game: Game = gameService.getGameById(dto.gameId);

    const round: Round = roundService.createRound(dto.multiplier);

    game.addRound(round);

    logger
      .context("game:round:add")
      .context(game.id)
      .log(`Round ${round.id} added.`);

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }

  socket.on("game:round:remove", deleteRound);
  function deleteRound(dto: RemoveRoundDto) {
    const game: Game = gameService.getGameById(dto.gameId);

    const round = roundService.getRoundById(dto.roundId);

    game.removeRound(round);
    roundService.deleteRound(round);

    logger
      .context("game:round:remove")
      .context(game.id)
      .log(`Round ${round.id} removed.`);

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }

  socket.on("round:question:bonus", markQuestionAsBonus);
  function markQuestionAsBonus(dto: { gameId: string, roundId: string, questionId: string }) {
    const game: Game = gameService.getGameById(dto.gameId);

    const round = game.getRoundById(dto.roundId);

    round.setQuestionAsBonus(dto.questionId);

    logger
      .context("round:question:bonus")
      .context(round.id)
      .log(`Question ${dto.questionId} marked as bonus.`);

    socket.to(round.id).emit("update", { game });
    socket.emit("update", { game});
  }
  
  socket.on("round:question:bonus", setQuestionAsBonus);
  function setQuestionAsBonus(dto: {
    gameId: string;
    questionId: string;
    bonusScore: number
  }) {
    const game = gameService.getGameById(dto.gameId);
    const question = game.getQuestionById(dto.questionId);

    if (game?.currentQuestion?.id !== question.id) return;
    question.value = dto.bonusScore;
    game.currentQuestion.value = dto.bonusScore;

    logger
      .context("round:question:bonus")
      .context(game.id)
      .log(`Question ${question.id} set as bonus`);

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }
};
