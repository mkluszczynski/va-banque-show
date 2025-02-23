import { genId } from "../../utils/gen-id";
import { Player } from "./player";

export class PlayerService {
  public players: Player[] = [];

  public getPlayerById(id: string): Player {
    const player = this.players.find((player) => player.id === id);

    if (!player) {
      throw new Error(`Player with id ${id} not found`);
    }

    return player;
  }

  public registerPlayer(nickname: string): Player {
    const player = new Player(genId(), nickname);
    this.players.push(player);
    return player;
  }

  public editPlayer(playerId: string, nickname: string): Player {
    const player = this.getPlayerById(playerId);
    player.nickname = nickname;
    return player;
  }
}
