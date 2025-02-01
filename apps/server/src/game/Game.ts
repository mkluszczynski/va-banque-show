import { Team } from "./Team";

export class Game {
  public id: string;
  public teams: Team[] = [];

  constructor(id: string) {
    this.id = id;
  }

  addTeam(team: Team) {
    this.teams.push(team);
  }
}
