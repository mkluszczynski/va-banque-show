import { genId } from "../../utils/gen-id";
import { Player } from "../player/player";
import { Question } from "../question/question";
import { Round } from "../round/round";
import { Team } from "../team/team";

export class Game {
  public id: string;
  public admin: Player | null = null;
  public teams: Team[] = [];
  public rounds: Round[] = [];
  public players: Player[] = [];

  public currentRound: Round | null = null;
  public currentQuestion: Question | null = null;
  public answaringPlayer: Player | null = null;

  constructor(admin: Player) {
    this.id = genId();
    this.admin = admin;
  }

  addTeam(team: Team) {
    this.teams.push(team);
  }

  removeTeam(team: Team) {
    if(!this.doseTeamExist(team.id))
      throw new Error(`Team with id ${team.id} not found`);

    this.teams = this.teams.filter((t) => t.id !== team.id);
  }

  doseTeamExist(teamId: string) {
    return this.teams.some((team) => team.id === teamId);
  }

  addRound(round: Round) {
    this.rounds.push(round);
  }

  removeRound(round: Round) {
    if(!this.doseRoundExist(round.id))
      throw new Error(`Round with id ${round.id} not found`);

    this.rounds = this.rounds.filter((r) => r.id !== round.id);
  }

  doseRoundExist(roundId: string) {
    return this.rounds.some((round) => round.id === roundId);
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  removePlayer(player: Player) {
    if(!this.dosePlayerExist(player.id))
      throw new Error(`Player with id ${player.id} not found`);
    this.players = this.players.filter((p) => p.id !== player.id);
  }

  dosePlayerExist(playerId: string) {
    return this.players.some((player) => player.id === playerId);
  }

  setAnswaringPlayer(player: Player) {
    if(!this.dosePlayerExist(player.id))
      throw new Error(`Player with id ${player.id} not found`);
    if(this.answaringPlayer)
      throw new Error(`Player with id ${this.answaringPlayer.id} is already answaring`);
    this.answaringPlayer = player;
  }

  removeAnswaringPlayer() {
    this.answaringPlayer = null;
  }

  getCurrentAnswaringTeam(){
    const team = this.teams.find((team) => team.players.some((player) => player.id === this.answaringPlayer?.id));

    if(!team)
      throw new Error(`Team with player ${this.answaringPlayer?.id} not found`);

    return team;
  }

  setCurrentRound(round: Round): void {
    if(!this.doseRoundExist(round.id))
      throw new Error(`Round with id ${round.id} not found`);

    this.currentRound = round;
  }

  setCurrentQuestion(question: Question): void {
    if(!this.currentRound)
      throw new Error(`Round not found`);

    if(!this.currentRound.doseQuestionExist(question.id))
      throw new Error(`Question with id ${question.id} not found in category with id ${question.id}`);

    if(question.isAnswared)
      throw new Error(`Question with id ${question.id} is already answared`);

    this.currentQuestion = question;
  }

  getCurrentQuestion(): Question {
    if(!this.currentQuestion)
      throw new Error(`No question is selected`);

    return this.currentQuestion;
  }

  removeQuestion(): void {
    this.currentQuestion = null;
  }

  validateAnswer(isAnswerValid: boolean): void {
    if(!this.answaringPlayer)
      throw new Error(`No player is answaring`);

    const question = this.getCurrentQuestion();

    if(isAnswerValid)
      this.getCurrentAnswaringTeam().addScore(question.value);
      question.markAsAnswared();
    

    this.removeAnswaringPlayer();
    this.removeQuestion();
  }
}
