import { Player } from "../player/player";

export class Team {
  public id: string;
  public name: string;
  public players: Player[] = [];
  public score: number = 0;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }
}
