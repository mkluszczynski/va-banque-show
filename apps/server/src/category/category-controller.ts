import { Socket } from "socket.io";
import { CategoryService } from "./category-service";
import { GameService } from "../game/game-service";
import { AddCategoryDto } from "./dto/add-category-dto";
import { Game } from "../game/game";
import { RoundService } from "../round/round-service";

export const categoryController = (
  socket: Socket,
  categoryService: CategoryService,
  roundService: RoundService,
  gameService: GameService,
) => {
  socket.on("category:all", getAllCategories);
  function getAllCategories(callback: CallableFunction) {
    console.log("[Server][categoryController] Getting all categories.");
    const categories = categoryService.getCategories();
    callback({ categories });
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

    if(!game.doseRoundExist(round.id)){
      console.log("[Server][gameController] Round not found.");
      socket.emit("error", { message: "Round not found" });
      return;
    }

    round.addCategory(category);

    socket.broadcast.to(game.id).emit("update", { game });
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

    if(!game.doseRoundExist(round.id)){
      console.log("[Server][gameController] Round not found.");
      socket.emit("error", { message: "Round not found" });
      return;
    }

    round.removeCategoryById(category.id);

    socket.broadcast.to(game.id).emit("update", { game });
  }
};
