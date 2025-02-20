import { genId } from "../../utils/gen-id";
import { RegisterPlayerDto } from "./dto/register-player-dto";
import { Player } from "./player";

export class PlayerService {
  public players: Player[] = [];

  public registerPlayer(dto: RegisterPlayerDto): Player {
    const player = new Player(genId(), dto.nickname);
    this.players.push(player);
    return player;
  }

  public getPlayerById(id: string): Player{
    const player = this.players.find((player) => player.id === id);

    if (!player) {
      throw new Error(`Player with id ${id} not found`);
    }

    return player;
  }
}
