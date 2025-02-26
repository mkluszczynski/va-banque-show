import { Socket } from "socket.io";
import { RegisterPlayerDto } from "./dto/register-player-dto";
import { Player } from "./player";
import { PlayerService } from "./player-service";
import { EditPlayerDto } from "./dto/edit-player-dto";
import { CheckPlayer } from "./dto/check-player-dto";

export const playerController = (
  socket: Socket,
  playerService: PlayerService
) => {

  socket.on("player:check", checkPlayer);
  function checkPlayer(dto: CheckPlayer, callback: CallableFunction) {
    let player: Player | null = null;
    try {
      player = playerService.getPlayerById(dto.playerId);
    } catch (e) {
      const err = e as Error;
      console.log(
        `[Server][playerController][player:check] Player with id ${dto.playerId} not found`,
        err.message
      );
    }
    callback(!!player);
  }

  socket.on("player:register", registerPlayer);
  function registerPlayer(dto: RegisterPlayerDto, callback: CallableFunction) {
    const registeredPlayer: Player = playerService.registerPlayer(dto.nickname);
    console.log(
      "[Server][playerController][player:register] Player registered.", 
      registeredPlayer.toString()
    );
    callback({ player: registeredPlayer });
  }

  socket.on("player:edit", editPlayer);
  function editPlayer(dto: EditPlayerDto, callback: CallableFunction) {
    const editedPlayer: Player = playerService.editPlayer(dto.id, dto.nickname);

    console.log("[Server][playerController][player:edit] Player edited.", editedPlayer.toString());

    callback({ player: editedPlayer });
  }
};
