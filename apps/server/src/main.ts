import { Server, Socket } from "socket.io";
import { PlayerService } from "./player/player-service";
import { GameService } from "./game/game-service";
import { playerController } from "./player/player-controller";
import { gameController } from "./game/game-controller";
import { teamController } from "./team/team-controller";
import { TeamService } from "./team/team-service";

const server = new Server(3000);

const playerService = new PlayerService();
const gameService = new GameService(playerService);
const teamService = new TeamService();

const onConnection = (socket: Socket) => {
  playerController(socket, playerService);
  gameController(socket, gameService);
  teamController(socket, gameService, playerService, teamService);
};

server.on("connection", (socket) => {
  console.log("[Server] Client connected.");
  onConnection(socket);

  socket.on("disconnect", () => {
    console.log("[Server] Client disconnected.");
  });
});
