import { Socket } from "socket.io";
import { GameService } from "../game/game-service";
import { AddRoundDto } from "../game/dto/add-round-dto";
import { Game } from "../game/game";
import { RoundService } from "./round-service";
import { RemoveRoundDto } from "../game/dto/remove-round-dto";
import { AddCategoryDto } from "../game/dto/add-category-dto";
import { CategoryService } from "../category/category-service";
import { Round } from "./round";

export const roundController = (
  socket: Socket,
  roundService: RoundService,
  gameService: GameService,
  categoryService: CategoryService
) => {
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

    const round = roundService.getRoundById(dto.roundId);
    if (!round) {
      console.log("[Server][gameController] Round not found.");
      socket.emit("error", { message: "Round not found" });
      return;
    }

    game.removeRound(round);

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

    const round = roundService.getRoundById(dto.roundId);

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

    const round = roundService.getRoundById(dto.roundId);

    if (!round) {
      console.log("[Server][gameController] Round not found.");
      socket.emit("error", { message: "Round not found" });
      return;
    }

    round.removeCategoryById(category.id);
  }
};
