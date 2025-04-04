import { Socket } from "socket.io";
import { Logger } from "../../utils/logger";
import { GameService } from "../game/game-service";
import { RoundService } from "../round/round-service";
import { CategoryService } from "./category-service";
import { AddCategoryDto } from "./dto/add-category-dto";

export const categoryController = (
  socket: Socket,
  categoryService: CategoryService,
  roundService: RoundService,
  gameService: GameService
) => {
  const logger = new Logger(["Server", "CategoryController"]);

  socket.on("category:all", getAllCategories);
  function getAllCategories(callback: CallableFunction) {
    console.log("[Server][categoryController] Getting all categories.");
    const categories = categoryService.getCategories();
    callback(categories);
  }

  socket.on("game:round:category:add", addCategory);
  function addCategory(dto: AddCategoryDto) {
    const game = gameService.getGameById(dto.gameId);
    const category = categoryService.getCategoryById(dto.categoryId);
    const round = roundService.getRoundById(dto.roundId);

    if (!game.doseRoundExist(dto.roundId)) throw new Error("Round not found");

    if (!game.doseRoundExist(round.id)) throw new Error("Round not found");

    round.addCategory(category);

    logger
      .context("game:round:category:add")
      .context(game.id)
      .log(
        `Category ${category.id} added to round ${round.id} in game ${game.id}.`
      );

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }

  socket.on("game:round:category:remove", removeCategory);
  function removeCategory(dto: AddCategoryDto) {
    const game = gameService.getGameById(dto.gameId);
    const category = categoryService.getCategoryById(dto.categoryId);
    const round = roundService.getRoundById(dto.roundId);

    if (!game.doseRoundExist(dto.roundId)) throw new Error("Round not found");

    if (!game.doseRoundExist(round.id)) {
      console.log("[Server][gameController] Round not found.");
      socket.emit("error", { message: "Round not found" });
      return;
    }

    round.removeCategoryById(category.id);

    logger
      .context("game:round:category:remove")
      .context(game.id)
      .log(
        `Category ${category.id} removed from round ${round.id} in game ${game.id}.`
      );

    socket.to(game.id).emit("update", { game });
    socket.emit("update", { game });
  }
};
