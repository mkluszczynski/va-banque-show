import { Socket } from "socket.io";
import { RegisterPlayerDto } from "./dto/register-player-dto";
import { Player } from "./player";
import { PlayerService } from "./player-service";
import { EditPlayerDto } from "./dto/edit-player-dto";
import { CheckPlayer } from "./dto/check-player-dto";
import { Logger } from "../../utils/logger";

export const playerController = (
  socket: Socket,
  playerService: PlayerService
) => {

  const logger = new Logger(["Server", "PlayerController"]);

  socket.on("player:check", checkPlayer);
  function checkPlayer(dto: CheckPlayer, callback: CallableFunction) {
    let player: Player | null = null;
    try {
      player = playerService.getPlayerById(dto.playerId);
    } catch (e) {
      const err = e as Error;
      logger.context("player:check").error(`Player with id ${dto.playerId} not found`, err);
    }
    callback(!!player);
  }

  socket.on("player:register", registerPlayer);
  function registerPlayer(dto: RegisterPlayerDto, callback: CallableFunction) {
    const registeredPlayer: Player = playerService.registerPlayer(dto.nickname);
    logger.context("player:register").log(`Player ${registeredPlayer.toString()} registered.`);
    callback({ player: registeredPlayer });
  }

  socket.on("player:edit", editPlayer);
  function editPlayer(dto: EditPlayerDto, callback: CallableFunction) {
    const editedPlayer: Player = playerService.editPlayer(dto.id, dto.nickname);

    logger.context("player:edit").log(`Player ${editedPlayer.toString()} edited.`);

    callback({ player: editedPlayer });
  }
};
