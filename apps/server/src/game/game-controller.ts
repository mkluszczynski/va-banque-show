import { Socket } from "socket.io";
import { JoinGameDto } from "./dto/join-game-dto";
import { Game } from "./game";
import { GameService } from "./game-service";
import { RoundService } from "../round/round-service";
import { CategoryService } from "../category/category-service";
import { PlayerService } from "../player/player-service";
import { CreateGameDto } from "./dto/cerate-game-dto";
import { TeamService } from "../team/team-service";
import { SelectQuestionDto } from "./dto/select-question-dto";
import { ValidateAnswerDto } from "./dto/validate-answer-dto";

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
    const game = gameService.getGameById(data.gameId);
    const player = playerService.getPlayerById(data.playerId);

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

  socket.on("game:question:select", selectQuestion);
  function selectQuestion(dto: SelectQuestionDto) {
    const game = gameService.getGameById(dto.gameId);

    const round = roundService.getRoundById(dto.roundId);

    const category = categoryService.getCategoryById(dto.categoryId);
    if (!round.douseCategoryExist(dto.categoryId))
      throw new Error(`Category with id ${dto.categoryId} not found`);

    const question = category.getQuestionById(dto.questionId);

    game.setCurrentQuestion(question);

    socket.broadcast.to(game.id).emit("update", { game });
  }

  socket.on("game:round:select", selectRound);
  function selectRound(gameId: string, roundId: string) {
    const game = gameService.getGameById(gameId);
    const round = roundService.getRoundById(roundId);

    game.setCurrentRound(round);

    socket.broadcast.to(game.id).emit("update", { game });
  }

  socket.on("game:answer:validate", validateAnswer);
  function validateAnswer(dto: ValidateAnswerDto) {
    const game = gameService.getGameById(dto.gameId);

    game.validateAnswer(dto.isValid);

    socket.broadcast.to(game.id).emit("update", { game });
  }
};
