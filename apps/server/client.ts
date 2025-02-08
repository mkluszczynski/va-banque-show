import { io } from "socket.io-client";
import { Game } from "./src/game/game";
import { Player } from "./src/player/player";
import readline from "readline";
import { JoinGameDto } from "./src/game/dto/join-game-dto";
import { CreateGameDto } from "./src/game/dto/cerate-game-dto";
import { JoinTeamDto } from "./src/team/dto/join-team-dto";

let game: Game | null = null;
let player: Player | null = null;

const socket = io("http://localhost:3000/", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected to server.");
});

socket.on("error", (error: unknown) => {
  console.error("Error:", error);
});

socket.on(`update`, (data: { game: Game }) => {
  game = data.game;
  console.log("Game updated:", game);
});

function registerPlayerCommand(nickname: string) {
  socket.emit("player:register", { nickname }, (data: { player: Player }) => {
    player = data.player;
    console.log(data);
  });
}

function createGameCommand() {
  if (!player) {
    console.log("You need to register a player first.");
    return;
  }
  const dto: CreateGameDto = {
    adminId: player.id,
  };
  socket.emit("game:create", dto, (data: { game: Game }) => {
    game = data.game;
    console.log("Game created:", game);
  });
}

function joinGameCommand(gameId: string) {
  if (!player) return;
  const dto: JoinGameDto = {
    gameId,
    playerId: player.id,
  };
  socket.emit("game:join", dto, (data: { game: Game }) => {
    game = data.game;
    console.log("Joined game successfully:", data.game);
  });
}

function joinTeamCommand(teamId: string) {
  if (!game || !player) return;
  const dto: JoinTeamDto = {
    gameId: game.id,
    playerId: player.id,
    teamId,
  };
  socket.emit("team:join", dto, (data: { game: Game }) => {
    game = data.game;
    console.log("Joined team successfully:", data.game.teams);
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input: string) => {
  const [command, prop] = input.split(" ");
  if (command === "join" && prop) joinGameCommand(prop);

  if (command === "player" && prop) registerPlayerCommand(prop);

  if (command === "create") createGameCommand();

  if (command === "team" && prop) joinTeamCommand(prop);
});
