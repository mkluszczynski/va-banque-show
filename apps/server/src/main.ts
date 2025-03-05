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
import { handleError } from "../utils/error-catch";
import { Logger } from "../utils/logger";
import { roundController } from "./round/round-controller";

const serverLogger = new Logger(["Server"]);

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
  roundController(socket, roundService, gameService);
  categoryController(socket, categoryService, roundService, gameService);
};

const server = new Server(3000, {
  cors: {
    origin: "*",
  },
});

serverLogger.log("Server started on port 3000");

server.use(validateDtoMiddleware)
server.use(handleError)

server.on("connection", (socket) => {
  serverLogger.log("Client connected."); 

  onConnection(socket);

  socket.on("disconnect", () => {
    serverLogger.log("Client disconnected.");
  });
});
