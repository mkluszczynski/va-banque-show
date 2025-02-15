import { Player } from "../../player/player";
import { Round } from "../../round/round";
import { Team } from "../../team/team";
import { GameState } from "./game-state";

export class LobbyState extends GameState {
  addPlayer(player: Player) {
    this.context.players.push(player);
  }

  removePlayer(player: Player) {
    this.context.players = this.context.players.filter(
      (p) => p.id !== player.id
    );
  }

  addTeam(team: Team) {
    this.context.teams.push(team);
  }

  removeTeam(team: Team) {
    this.context.teams = this.context.teams.filter((t) => t.id !== team.id);
  }

  addRound(round: Round) {
    this.context.rounds.push(round);
  }

  removeRound(round: Round) {
    this.context.rounds = this.context.rounds.filter((r) => r.id !== round.id);
  }

  startGame() {
    throw new Error("Method not implemented.");
  }

  endGame() {
    throw new Error("Method not implemented.");
  }

  selectQuestion() {
    throw new Error("Method not implemented.");
  }

  waitForAnswer() {
    throw new Error("Method not implemented.");
  }

  validateAnswer() {
    throw new Error("Method not implemented.");
  }

  addScore(score: number) {
    throw new Error("Method not implemented.");
  }

  removeScore(score: number) {
    throw new Error("Method not implemented.");
  }

  startRound() {
    throw new Error("Method not implemented.");
  }

  endRound() {
    throw new Error("Method not implemented.");
  }
}
