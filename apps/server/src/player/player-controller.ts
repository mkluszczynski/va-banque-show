import { Socket } from "socket.io";
import { RegisterPlayerDto } from "./dto/register-player-dto";
import { Player } from "./player";
import { PlayerService } from "./player-service";

export const playerController = (
  socket: Socket,
  playerService: PlayerService
) => {
  socket.on("player:register", registerPlayer);
  function registerPlayer(dto: RegisterPlayerDto, callback: CallableFunction) {
    if (!dto.nickname) {
      console.log("[Server][playerRegister] Invalid player data.");
      socket.emit("error", { message: "Invalid data" });
      return;
    }

    const registeredPlayer: Player = playerService.registerPlayer(dto);
    console.log(
      "[Server][playerRegister] Player registered.",
      registeredPlayer
    );
    callback({ player: registeredPlayer });
  }
};
