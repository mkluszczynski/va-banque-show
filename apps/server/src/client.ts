import { io } from "socket.io-client";
import readline from "readline";

const client = io("ws://localhost:3000");

client.on("connect", () => {
  console.log("Connected to server.");
  client.emit("gameList");
  // joinGame("game-1");
});

function joinGame(gameId: string) {
  client.emit("joinGame", {
    gameId,
    playerName: `Player ${genPlayerId()}`,
  });
  client.on("gameJoined", (data) => {
    console.log(`Joined game: ${data.gameId}`);
    console.log("Teams:", data.teams);
  });
}

client.on("gameNotFound", (data) => {
  console.log(`Game not found: ${data.gameId}`);
});

client.on("playerNameRequired", (data) => {
  console.log("Player name required.", data);
});

client.on("disconnect", () => {
  console.log("Disconnected from server.");
});

client.on("gameList", (data) => {
  console.log("Games:", data.games);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  if (input.trim().toLowerCase() === "join") {
    joinGame("game-1");
  }

  if (input.trim().toLowerCase().split(" ")[0] === "team") {
    client.emit("teamSelect", {
      teamId: input.trim().toLowerCase().split(" ")[1],
    });
  }
});

function genPlayerId() {
  return Math.floor(Math.random() * 1000).toString();
  // return Math.random().toString(36).substring(7);
}
