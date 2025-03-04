import { Player } from "../player/player";
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
    const team = this.teams.find((team) => team.id === id);

    if (!team) {
      throw new Error(`Team with id ${id} not found`);
    }

    return team;
  }

  getTeams(): Team[] {
    return this.teams;
  }

  doseTeamExist(team: Team): boolean {
    return this.teams.some((t) => t.id === team.id);
  }

  removeTeam(team: Team): void {
    if(!this.doseTeamExist(team))
      throw new Error(`Team with id ${team.id} not found`);

    this.teams = this.teams.filter((t) => t.id !== team.id);
  }

  isPlayerAlreadyInTeam(player: Player): boolean {
    return this.teams.some((team) => team.dosePlayerExist(player));
  }

  getTeamByPlayer(player: Player): Team {
    const team = this.teams.find((team) => team.dosePlayerExist(player));

    if (!team) {
      throw new Error(`Player with id ${player.id} not found in any team`);
    }

    return team;
  }

  addPlayerToTeam(player: Player, team: Team) {

    if(!this.doseTeamExist(team))
      throw new Error(`Team with id ${team.id} not found`);

    if (this.isPlayerAlreadyInTeam(player)) {
      const playerTeam = this.getTeamByPlayer(player);
      playerTeam.removePlayerById(player);
    }

    team.addPlayer(player);
  }

  removePlayerFromTeam(player: Player, team: Team) {
    if(!this.doseTeamExist(team))
      throw new Error(`Team with id ${team.id} not found`);

    team.removePlayerById(player);
  }
}
