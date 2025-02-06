import { Server } from "socket.io";
import { AppConfig } from "./types/app-config";

export class App {
  private readonly server: Server;

  constructor(config: Partial<AppConfig> = {}) {
    this.server = new Server(3000);

    this.server.on("connection", (socket) => {
      console.log("Client connected.");

      socket.on("message", (data) => {
        console.log(`[Server] Received: ${data}`);
      });

      socket.on("player", (data) => {
        console.log(`[Server] Player: ${data}`);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected.");
      });

      // create game
      // create team
      // create player
      // add player to team
      // add team to game
      // start game
      // add round to game
      // end game
    });
  }

  public run() {}
}
