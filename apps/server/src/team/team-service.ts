import { Team } from "./team";

export class TeamService {
  public teams: Team[] = [];

  createTeam(name: string) {
    const team = new Team(name);
    this.addTeam(team);
    return team;
  }

  addTeam(team: Team) {
    this.teams.push(team);
  }

  getTeamById(id: string) {
    return this.teams.find((team) => team.id === id);
  }

  getTeams() {
    return this.teams;
  }

  doseTeamExist(id: string) {
    return this.teams.some((team) => team.id === id);
  }

  removeTeamById(id: string) {
    this.teams = this.teams.filter((team) => team.id !== id);
  }
}
