import { genId } from "../../utils/gen-id";
import { Round } from "../round/round";
import { Team } from "../team/team";

export class Game {
  public id: string;
  public teams: Team[] = [];
  public rounds: Round[] = [];

  constructor() {
    this.id = genId();
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

  removeTeamById(teamId: string) {
    this.teams = this.teams.filter((team) => team.id !== teamId);
  }

  doseRoundExist(roundId: string) {
    return this.rounds.some((round) => round.id === roundId);
  }

  removeRoundById(roundId: string) {
    this.rounds = this.rounds.filter((round) => round.id !== roundId);
  }

  getRoundById(roundId: string): Round | null {
    const round = this.rounds.find((round) => round.id === roundId);
    return round || null;
  }
}
