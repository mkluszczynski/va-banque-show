import { genId } from "../../utils/gen-id";
import { Player } from "../player/player";
import { Question } from "../question/question";
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
  public answaringPlayer: Player | null = null;

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

  removeTeam(team: Team) {
    this.teams = this.teams.filter((t) => t.id !== team.id);
  }

  doseTeamExist(teamId: string) {
    return this.teams.some((team) => team.id === teamId);
  }

  addRound(round: Round) {
    this.rounds.push(round);
  }

  removeRound(round: Round) {
    this.rounds = this.rounds.filter((r) => r.id !== round.id);
  }

  doseRoundExist(roundId: string) {
    return this.rounds.some((round) => round.id === roundId);
  }

  addPlayer(player: Player) {
    this.gameState.addPlayer(player);
  }

  removePlayer(player: Player) {
    this.gameState.removePlayer(player);
  }

  dosePlayerExist(playerId: string) {
    return this.players.some((player) => player.id === playerId);
  }

  startGame() {
    this.gameState.startGame();
  }

  endGame() {
    this.gameState.endGame();
  }

  selectQuestion(question: Question) {
    this.gameState.selectQuestion(question);
  }

  waitForAnswer() {
    this.gameState.waitForAnswer();
  }

  playerAnswer(player: Player) {
    this.gameState.playerAnswer(player);
  }

  validateAnswer() {
    this.gameState.validateAnswer();
  }

  addScore(score: number) {
    this.gameState.addScore(score);
  }

  removeScore(score: number) {
    this.gameState.removeScore(score);
  }

  startRound() {
    this.gameState.startRound();
  }

  endRound() {
    this.gameState.endRound();
  }
}
