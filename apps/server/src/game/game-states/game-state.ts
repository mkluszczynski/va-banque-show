import { Player } from "../../player/player";
import { Question } from "../../question/question";
import { Round } from "../../round/round";
import { Team } from "../../team/team";
import { Game } from "../game";

export abstract class GameState {
  constructor(protected context: Game) {}

  setContext(context: Game) {
    this.context = context;
  }

  abstract addPlayer(player: Player): void;
  abstract removePlayer(player: Player): void;
  abstract addTeam(team: Team): void;
  abstract removeTeam(team: Team): void;
  abstract addRound(round: Round): void;
  abstract removeRound(round: Round): void;
  abstract startGame(): void;
  abstract endGame(): void;
  abstract selectQuestion(question: Question): void;
  abstract waitForAnswer(): void;
  abstract playerAnswer(player: Player): void;
  abstract validateAnswer(): void;
  abstract addScore(score: number): void;
  abstract removeScore(score: number): void;
  abstract startRound(): void;
  abstract endRound(): void;
}
