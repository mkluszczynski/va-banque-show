import { genId } from "../../utils/gen-id";
import { Player } from "../player/player";

export class Team {
  public id: string;
  public name: string;
  public players: Player[] = [];
  public score: number = 0;

  constructor(name: string) {
    this.id = genId();
    this.name = name;
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  dosePlayerExist(player: Player) {
    return this.players.some((p) => p.id === player.id);
  }

  removePlayerById(player: Player) {
    if(!this.dosePlayerExist(player))
      throw new Error(`Player with id ${player.id} not found`);

    this.players = this.players.filter((p) => p.id !== player.id);
  }

  addScore(score: number) {
    this.score += score;
  }
}
