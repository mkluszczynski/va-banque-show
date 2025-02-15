import { genId } from "../../utils/gen-id";
import { Player } from "../player/player";
import { Round } from "../round/round";
import { Team } from "../team/team";
import { GameState } from "./game-states/game-state";
import { LobbyState } from "./game-states/lobby-state";

export class Game {
  public id: string;
  public teams: Team[] = [];
  public rounds: Round[] = [];
  public players: Player[] = [];
  public admin: Player | null = null;

  private gameState: GameState;

  constructor(admin: Player) {
    this.id = genId();
    this.admin = admin;

    this.gameState = new LobbyState(this);
  }

  setGameState(gameState: GameState) {
    this.gameState = gameState;
    this.gameState.setContext(this);
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

  joinPlayer(player: Player) {
    this.players.push(player);
  }

  dosePlayerExist(playerId: string) {
    return this.players.some((player) => player.id === playerId);
  }
}
