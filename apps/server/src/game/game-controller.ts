import { Socket } from "socket.io";
import { JoinGameDto } from "./dto/join-game-dto";
import { Game } from "./game";
import { GameService } from "./game-service";
import { AddRoundDto } from "./dto/add-round-dto";
import { Round } from "../round/round";
import { RoundService } from "../round/round-service";
import { RemoveRoundDto } from "./dto/remove-round-dto";
import { CategoryService } from "../category/category-service";
import { AddCategoryDto } from "./dto/add-category-dto";

export const gameController = (
  socket: Socket,
  gameService: GameService,
  roundService: RoundService,
  categoryService: CategoryService
) => {
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

  socket.on("game:round:add", addRound);
  function addRound(dto: AddRoundDto) {
    const game: Game | null = gameService.getGameById(dto.gameId);

    if (!game) {
      console.log("[Server][gameController] Game not found.");
      socket.emit("error", { message: "Game not found" });
      return;
    }

    const round: Round = roundService.createRound(dto.multiplier);

    game.addRound(round);

    socket.emit("game:round:add:success", { game });
  }

  socket.on("game:round:remove", deleteRound);
  function deleteRound(dto: RemoveRoundDto) {
    const game: Game | null = gameService.getGameById(dto.gameId);

    if (!game) {
      console.log("[Server][gameController] Game not found.");
      socket.emit("error", { message: "Game not found" });
      return;
    }

    if (!game.doseRoundExist(dto.roundId)) {
      console.log("[Server][gameController] Round not found.");
      socket.emit("error", { message: "Round not found" });
      return;
    }

    game.removeRoundById(dto.roundId);

    socket.emit("game:round:remove:success", { game });
  }

  socket.on("game:round:categorie:add", addCategorie);
  function addCategorie(dto: AddCategoryDto) {
    const game: Game | null = gameService.getGameById(dto.gameId);

    if (!game) {
      console.log("[Server][gameController] Game not found.");
      socket.emit("error", { message: "Game not found" });
      return;
    }

    if (!game.doseRoundExist(dto.roundId)) {
      console.log("[Server][gameController] Round not found.");
      socket.emit("error", { message: "Round not found" });
      return;
    }

    const category = categoryService.getCategoryById(dto.categoryId);

    if (!category) {
      console.log("[Server][gameController] Category not found.");
      socket.emit("error", { message: "Category not found" });
      return;
    }

    const round = game.getRoundById(dto.roundId);

    if (!round) {
      console.log("[Server][gameController] Round not found.");
      socket.emit("error", { message: "Round not found" });
      return;
    }

    round.addCategory(category);
  }

  socket.on("game:round:categorie:remove", removeCategorie);
  function removeCategorie(dto: AddCategoryDto) {
    const game: Game | null = gameService.getGameById(dto.gameId);

    if (!game) {
      console.log("[Server][gameController] Game not found.");
      socket.emit("error", { message: "Game not found" });
      return;
    }

    if (!game.doseRoundExist(dto.roundId)) {
      console.log("[Server][gameController] Round not found.");
      socket.emit("error", { message: "Round not found" });
      return;
    }

    const category = categoryService.getCategoryById(dto.categoryId);

    if (!category) {
      console.log("[Server][gameController] Category not found.");
      socket.emit("error", { message: "Category not found" });
      return;
    }

    const round = game.getRoundById(dto.roundId);

    if (!round) {
      console.log("[Server][gameController] Round not found.");
      socket.emit("error", { message: "Round not found" });
      return;
    }

    round.removeCategoryById(category.id);
  }
};
