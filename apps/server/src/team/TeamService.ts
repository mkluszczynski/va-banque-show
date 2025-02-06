import { Team } from "./Team";

export class TeamService {
  public teams: Team[] = [];

  addTeam(team: Team) {
    this.teams.push(team);
  }

  getTeamById(id: string) {
    return this.teams.find((team) => team.id === id);
  }

  getTeams() {
    return this.teams;
  }

  removeTeamById(id: string) {
    this.teams = this.teams.filter((team) => team.id !== id);
  }
}
