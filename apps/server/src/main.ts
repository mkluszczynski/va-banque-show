import { Server, Socket } from "socket.io";
import { PlayerService } from "./player/PlayerService";
import { GameService } from "./game/GameService";
import { playerController } from "./player/PlayerController";
import { gameController } from "./game/GameController";
import { teamController } from "./team/TeamController";
import { TeamService } from "./team/TeamService";

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
