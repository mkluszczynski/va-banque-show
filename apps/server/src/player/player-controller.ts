import { Socket } from "socket.io";
import { RegisterPlayerDto } from "./dto/register-player-dto";
import { Player } from "./player";
import { PlayerService } from "./player-service";

export const playerController = (
  socket: Socket,
  playerService: PlayerService
) => {
  const registerPlayer = (data: RegisterPlayerDto) => {
    if (!data.nickname) {
      console.log("[Server][playerRegister] Invalid player data.");
      socket.emit("error", { message: "Invalid data" });
      return;
    }

    const registeredPlayer: Player = playerService.registerPlayer(data);
    socket.emit("playerRegistered", { player: registeredPlayer });
  };
  socket.on("player:register", registerPlayer);
};
