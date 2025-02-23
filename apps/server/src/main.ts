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
import { validateDtoMiddleware } from "../utils/validate-dto";


const playerService = new PlayerService();
const teamService = new TeamService();
const gameService = new GameService();
const categoryRepository = new CategoryRepository("categories.json");
const categoryService = new CategoryService(categoryRepository);
const roundService = new RoundService(categoryService);

const onConnection = (socket: Socket) => {
  playerController(socket, playerService);
  gameController(
    socket,
    gameService,
    roundService,
    categoryService,
    playerService,
    teamService
  );
  teamController(socket, gameService, playerService, teamService);
  categoryController(socket, categoryService, roundService, gameService);
};

const server = new Server(3000, {
  cors: {
    origin: "*",
  },
});
console.log("[Server] Server started.");

server.use(validateDtoMiddleware)

server.on("connection", (socket) => {
  console.log("[Server] Client connected.");
  
  try{
    onConnection(socket);
  } catch (error: unknown) {
    if (error instanceof Error) {
      socket.emit("error", { message: error.message });
    } else {
      socket.emit("error", { message: "An unknown error occurred." });
    }
  }

  socket.on("disconnect", () => {
    console.log("[Server] Client disconnected.");
  });
});
