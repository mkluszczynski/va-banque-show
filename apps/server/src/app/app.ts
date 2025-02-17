import { Server, Socket } from "socket.io";

export abstract class Controller {
  private socket: Socket | null = null;

  abstract handleConnection(): void;

  public setSocket(socket: Socket) {
    this.socket = socket;
  }

  protected getSocket(): Socket {
    if (!this.socket) {
      throw new Error("Socket is not set.");
    }
    return this.socket;
  }
}

export class App {
  private controllers: Controller[] = [];
  private server: Server;

  constructor(port: number) {
    this.server = new Server(port);
  }

  public run() {
    this.server.on("connection", (socket) => {
      console.log("[Server] Client connected.");

      this.addSocketToControllers(socket);
      this.handleConnection();
      // onConnection(socket);

      socket.on("disconnect", () => {
        console.log("[Server] Client disconnected.");
      });
    });
  }

  addController(controller: Controller) {
    this.controllers.push(controller);
  }

  addControllers(controllers: Controller[]) {
    this.controllers.push(...controllers);
  }

  handleConnection() {
    this.controllers.forEach((controller) => controller.handleConnection());
  }

  private addSocketToControllers(socket: Socket) {
    this.controllers.forEach((controller) => controller.setSocket(socket));
  }
}
