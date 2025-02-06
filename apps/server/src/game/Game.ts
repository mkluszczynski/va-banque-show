import { Round } from "../round/Round";
import { Team } from "../team/Team";

export class Game {
  public id: string;
  public teams: Team[] = [];
  public rounds: Round[] = [];

  constructor(id: string) {
    this.id = id;

    this.addTeam(new Team("team-1", "blue"));
    this.addTeam(new Team("team-2", "red"));
  }

  addTeam(team: Team) {
    this.teams.push(team);
  }

  addRound(round: Round) {
    this.rounds.push(round);
  }

  doseTeamExist(teamId: string) {
    return this.teams.some((team) => team.id === teamId);
  }
}
