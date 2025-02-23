import { Socket } from "socket.io";
import { RegisterPlayerDto } from "./dto/register-player-dto";
import { Player } from "./player";
import { PlayerService } from "./player-service";
import { EditPlayerDto } from "./dto/edit-player-dto";

export const playerController = (
  socket: Socket,
  playerService: PlayerService
) => {
  socket.on("player:register", registerPlayer);
  function registerPlayer(dto: RegisterPlayerDto, callback: CallableFunction) {
    const registeredPlayer: Player = playerService.registerPlayer(dto.nickname);
    console.log(
      "[Server][playerRegister] Player registered.",
      registeredPlayer
    );
    callback({ player: registeredPlayer });
  }

  socket.on("player:edit", editPlayer);
  function editPlayer(dto: EditPlayerDto, callback: CallableFunction) {
    const editedPlayer: Player = playerService.editPlayer(dto.id, dto.nickname);

    console.log("[Server][playerEdit] Player edited.", editedPlayer);

    callback({ player: editedPlayer });
  }
};
