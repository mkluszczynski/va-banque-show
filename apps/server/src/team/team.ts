import { genId } from "../../utils/gen-id";
import { Player } from "../player/player";

export class Team {
  public id: string;
  public name: string;
  public capitan: Player | null = null;
  public players: Player[] = [];
  public score: number = 0;

  constructor(name: string) {
    this.id = genId();
    this.name = name;
  }

  addPlayer(player: Player) {
    if(this.players.length === 0)
      this.capitan = player;
    this.players.push(player);
  }

  dosePlayerExist(player: Player) {
    return this.players.some((p) => p.id === player.id);
  }

  isPlayerCapitan(player: Player) {
    return this.capitan?.id === player.id;
  }

  removePlayer(player: Player) {
    if (!this.dosePlayerExist(player))
      throw new Error(`Player with id ${player.id} not found`);

    this.players = this.players.filter((p) => p.id !== player.id);

    if(this.capitan?.id === player.id) {
      if(this.players.length > 0){
        this.capitan = this.players[0];
      }
      else{
        this.capitan = null
      }
    }
  }

  addScore(score: number) {
    this.score += score;
  }

  removeScore(score: number) {
    this.score -= score;
  }
}
