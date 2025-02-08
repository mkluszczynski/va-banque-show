import { Server, Socket } from "socket.io";
import { PlayerService } from "./player/player-service";
import { GameService } from "./game/game-service";
import { playerController } from "./player/player-controller";
import { gameController } from "./game/game-controller";
import { teamController } from "./team/team-controller";
import { TeamService } from "./team/team-service";
import { RoundService } from "./round/round-service";
import { CategoryService } from "./category/category-service";
import { CategoryRepository } from "./category/category-repository";
import { categoryController } from "./category/category-controller";

const server = new Server(3000);

const playerService = new PlayerService();
const roundService = new RoundService();
const teamService = new TeamService();
const gameService = new GameService(playerService);
const categoryRepository = new CategoryRepository("categories.json");
const categoryService = new CategoryService(categoryRepository);

const onConnection = (socket: Socket) => {
  playerController(socket, playerService);
  gameController(socket, gameService, roundService, categoryService);
  teamController(socket, gameService, playerService, teamService);
  categoryController(socket, categoryService);
};

server.on("connection", (socket) => {
  console.log("[Server] Client connected.");
  onConnection(socket);

  socket.on("disconnect", () => {
    console.log("[Server] Client disconnected.");
  });
});
