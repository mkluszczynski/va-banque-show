import { genId } from "../../utils/gen-id";
import { RegisterPlayerDto } from "./dto/register-player.dto";
import { Player } from "./Player";

export class PlayerService {
  public players: Player[] = [];

  public registerPlayer(dto: RegisterPlayerDto): Player {
    const player = new Player(genId("player"), dto.nickname);
    this.players.push(player);
    return player;
  }

  public getPlayerById(id: string): Player | undefined {
    return this.players.find((player) => player.id === id);
  }
}
