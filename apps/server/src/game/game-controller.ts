import { Socket } from "socket.io";
import { Logger } from "../../utils/logger";
import { CategoryService } from "../category/category-service";
import { PlayerService } from "../player/player-service";
import { RoundService } from "../round/round-service";
import { TeamService } from "../team/team-service";
import { CreateGameDto } from "./dto/cerate-game-dto";
import { JoinGameDto } from "./dto/join-game-dto";
import { SelectQuestionDto } from "./dto/select-question-dto";
import { ValidateAnswerDto } from "./dto/validate-answer-dto";
import { Game } from "./game";
import { GameService } from "./game-service";
import { FinalRoundService } from "../final-round/final-round-service";

export const gameController = (
  socket: Socket,
  gameService: GameService,
  roundService: RoundService,
  categoryService: CategoryService,
  playerService: PlayerService,
  teamService: TeamService,
  finalRoundService: FinalRoundService
) => {
  const logger = new Logger(["Server", "GameController"]);

  socket.on("game:exists", existsGame);
  function existsGame(dto: { gameId: string }, callback: CallableFunction) {
    let game: Game | null = null;
    try {
      game = gameService.getGameById(dto.gameId);
    } catch (e) {
      const err = e as Error;
      logger
        .context("game:exists")
        .error(`Game with id ${dto.gameId} not found`, err);
    }
    callback(!!game);
  }

  socket.on("game:join", joinGame);
  function joinGame(data: JoinGameDto) {
    const game = gameService.getGameById(data.gameId);
    const player = playerService.getPlayerById(data.playerId);

    game.addPlayer(player);
    socket.join(game.id);

    logger
      .context("game:join")
      .log(`Player ${player.toString()} joined game: ${game.id}`);

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }

  socket.on("game:widget:join", joinGameWidget);
  function joinGameWidget(data: { gameId: string }) {
    const game = gameService.getGameById(data.gameId);

    socket.join(game.id);

    logger.context("game:widget:join").log(`Widget joined game: ${game.id}`);

    socket.emit("update", { game });
  }

  socket.on("game:rejoin", rejoinGame);
  function rejoinGame(data: JoinGameDto) {
    const game = gameService.getGameById(data.gameId);
    const player = playerService.getPlayerById(data.playerId);

    if (!game.dosePlayerExist(player.id) && !game.isPlayerAdmin(player))
      return logger
        .context("game:rejoin")
        .warn(`Player ${player.toString()} not found in game: ${game.id}`);

    if (socket.rooms.has(game.id)) return;
    socket.join(game.id);
    logger
      .context("game:rejoin")
      .log(`Player ${player.toString()} rejoined game: ${game.id}`);
  }

  socket.on("game:leave", leaveGame);
  function leaveGame(data: JoinGameDto) {
    const game = gameService.getGameById(data.gameId);
    const player = playerService.getPlayerById(data.playerId);

    if (game.isPlayerAdmin(player)) {
      gameService.deleteGame(game.id);
      logger
        .context("game:leave")
        .log(`Player ${player.toString()} left game: ${game.id}`);
      socket.broadcast.to(game.id).emit("game:closed");
      return;
    }

    game.removePlayer(player);
    teamService.removePlayerFromAllTeams(player);

    socket.leave(game.id);

    logger
      .context("game:leave")
      .log(`Player ${player.toString()} left game: ${game.id}`);

    socket.broadcast.to(game.id).emit("update", { game });
  }

  socket.on("game:create", createGame);
  function createGame(dto: CreateGameDto, callback: CallableFunction) {
    const admin = playerService.getPlayerById(dto.adminId);

    const game: Game = gameService.createGame(admin);

    game.addRound(roundService.createRound(1));
    game.addRound(roundService.createRound(2));

    game.addTeam(teamService.createTeam("Blue"));
    game.addTeam(teamService.createTeam("Red"));

    game.addFinalRound(finalRoundService.createFinalRound());

    logger.context("game:create").log(`Game created: ${game.id}`);

    callback({ game });
    socket.join(game.id);
    socket.broadcast.to(game.id).emit("update", { game });
  }

  socket.on("game:question:select", selectQuestion);
  function selectQuestion(dto: SelectQuestionDto) {
    const game = gameService.getGameById(dto.gameId);
    const round = game.getRoundById(dto.roundId);

    if (game.currentQuestion) return;

    if (!round.douseCategoryExist(dto.categoryId))
      return logger
        .context("game:question:select")
        .context(game.id)
        .error(`Category with id ${dto.categoryId} not found`);

    const question = round.getQuestionById(dto.questionId);

    game.setCurrentQuestion(question);

    round.categories
      .find((c) => c.id === dto.categoryId)!
      .questions.find((q) => q.id === dto.questionId)!.isAnswered = true;

    logger
      .context("game:question:select")
      .context(game.id)
      .log(`Question ${question.id} selected in game: ${game.id}`);

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }

  socket.on("game:round:select", selectRound);
  function selectRound(gameId: string, roundId: string) {
    const game = gameService.getGameById(gameId);
    const round = roundService.getRoundById(roundId);

    game.setCurrentRound(round);

    logger
      .context("game:round:select")
      .context(game.id)
      .log(`Round ${round.id} selected in game: ${game.id}`);

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }

  socket.on("game:answer:dispatch", dispatchAnswer);
  function dispatchAnswer(dto: { gameId: string; playerId: string }) {
    const game = gameService.getGameById(dto.gameId);
    const player = playerService.getPlayerById(dto.playerId);

    if (!game.currentQuestion) return;
    if (game.answeringPlayer) return;

    game.answeringPlayer = player;

    logger
      .context("game:answer:dispatch")
      .context(game.id)
      .log(`Answer dispatched in game: ${game.id}`);

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }

  socket.on("game:answer:validate", validateAnswer);
  function validateAnswer(dto: ValidateAnswerDto) {
    const game = gameService.getGameById(dto.gameId);

    game.validateAnswer(dto.isValid);

    logger
      .context("game:answer:validate")
      .context(game.id)
      .log(
        `Answer ${dto.isValid ? "correct" : "incorrect"} in game: ${game.id}`
      );

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }

  socket.on("game:answer:final:validate", validateFinalAnswer);
  function validateFinalAnswer(dto: { gameId: string; teamId: string; isValid: boolean }) {
    const game = gameService.getGameById(dto.gameId);
    const team = teamService.getTeamById(dto.teamId);

    game.validateFinalAnswer(team, dto.isValid);

    logger
      .context("game:answer:final:validate")
      .context(game.id)
      .log(
        `Final answer ${dto.isValid ? "correct" : "incorrect"} in game: ${game.id}`
      );

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }

  socket.on("game:question:skip", skipQuestion);
  function skipQuestion(gameId: string) {
    const game = gameService.getGameById(gameId);

    game.removeQuestion();

    logger
      .context("game:question:skip")
      .context(game.id)
      .log(`Question skipped in game: ${game.id}`);

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }

  socket.on("game:start", startGame);
  function startGame(gameId: string) {
    const game = gameService.getGameById(gameId);

    game.startGame();

    logger.context("game:start").context(game.id).log(`Game started`);

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }

  socket.on("game:round:next", nextRound);
  function nextRound(gameId: string) {
    const game = gameService.getGameById(gameId);

    game.nextRound();

    logger
      .context("game:next-round")
      .context(game.id)
      .log(`Next round in game: ${game.id}`);

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }

  socket.on("game:round:final", setFinalRoundQuestion);
  function setFinalRoundQuestion(dto: { gameId: string }) {
    const game = gameService.getGameById(dto.gameId);
    const finalRound = game.getFinalRound();

    finalRound.isLive = true;

    logger
      .context("game:round:final")
      .context(game.id)
      .log(`Final round in game: ${game.id}`);

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }

  socket.on("game:winner", getWinningTeam);
  function getWinningTeam(gameId: string) {
    const game = gameService.getGameById(gameId);

    logger
      .context("game:winner")
      .context(game.id)
      .log(`Winning team: ${game.getWinningTeam().name}`);

    socket.to(game.id).emit("game:winner", { winner: game.getWinningTeam() });
    socket.emit("game:winner", { winner: game.getWinningTeam() });
  }

  socket.on("game:finish", finishGame);
  function finishGame(gameId: string) {
    const game = gameService.getGameById(gameId);

    gameService.deleteGame(game.id);

    logger.context("game:finish").context(game.id).log(`Game finished`);

    socket.to(game.id).emit("update", { game: null });
    socket.emit("update", { game: null });
  }

 

};
