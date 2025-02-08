import { Socket } from "socket.io";
import { RegisterPlayerDto } from "./dto/register-player-dto";
import { Player } from "./player";
import { PlayerService } from "./player-service";

export const playerController = (
  socket: Socket,
  playerService: PlayerService
) => {
  const registerPlayer = (
    data: RegisterPlayerDto,
    callback: CallableFunction
  ) => {
    if (!data.nickname) {
      console.log("[Server][playerRegister] Invalid player data.");
      socket.emit("error", { message: "Invalid data" });
      return;
    }

    const registeredPlayer: Player = playerService.registerPlayer(data);
    console.log(
      "[Server][playerRegister] Player registered.",
      registeredPlayer
    );
    callback({ player: registeredPlayer });

    // socket.emit("player:register:success", { player: registeredPlayer });
  };
  socket.on("player:register", registerPlayer);
};
