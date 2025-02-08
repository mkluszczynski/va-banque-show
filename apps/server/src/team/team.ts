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

  dosePlayerExist(playerId: string) {
    return this.players.some((player) => player.id === playerId);
  }

  // static fromDto(dto: TeamDto): Team {
  //   const id = dto.id || genId();
  //   return new Team(id, dto.name);
  // }
}
