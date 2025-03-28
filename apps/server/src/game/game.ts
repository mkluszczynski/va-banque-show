import { genId } from "../../utils/gen-id";
import { Player } from "../player/player";
import { Question } from "../question/question";
import { FinalRound } from "../final-round/final-round";
import { Round } from "../round/round";
import { Team } from "../team/team";

export class Game {
  public id: string;
  public admin: Player;
  public teams: Team[] = [];
  public rounds: Round[] = [];
  public players: Player[] = [];

  public currentRound: Round | null = null;
  public currentQuestion: Question | null = null;
  public answeringPlayer: Player | null = null;
  public finalRound: FinalRound | null = null;

  constructor(admin: Player) {
    this.id = genId();
    this.admin = admin;
  }

  isPlayerAdmin(player: Player): boolean {
    return this.admin.id === player.id;
  }

  addTeam(team: Team) {
    this.teams.push(team);
  }

  removeTeam(team: Team) {
    if (!this.doseTeamExist(team.id))
      throw new Error(`Team with id ${team.id} not found`);

    this.teams = this.teams.filter((t) => t.id !== team.id);
  }

  doseTeamExist(teamId: string) {
    return this.teams.some((team) => team.id === teamId);
  }

  addRound(round: Round) {
    this.rounds.push(round);
  }

  addFinalRound(finalRound: FinalRound) {
    this.finalRound = finalRound;
  }

  removeRound(round: Round) {
    if (!this.doseRoundExist(round.id))
      throw new Error(`Round with id ${round.id} not found`);

    this.rounds = this.rounds.filter((r) => r.id !== round.id);
  }

  doseRoundExist(roundId: string) {
    return this.rounds.some((round) => round.id === roundId);
  }

  addPlayer(player: Player) {
    if (this.dosePlayerExist(player.id))
      throw new Error(`Player with id ${player.id} already exists`);
    this.players.push(player);
  }

  removePlayer(player: Player) {
    if (!this.dosePlayerExist(player.id))
      throw new Error(`Player with id ${player.id} not found`);
    this.players = this.players.filter((p) => p.id !== player.id);
  }

  dosePlayerExist(playerId: string) {
    return this.players.some((player) => player.id === playerId);
  }

  setAnsweringPlayer(player: Player) {
    if (!this.dosePlayerExist(player.id))
      throw new Error(`Player with id ${player.id} not found`);
    if (this.answeringPlayer)
      throw new Error(
        `Player with id ${this.answeringPlayer.id} is already answering`
      );
    this.answeringPlayer = player;
  }

  removeAnsweringPlayer() {
    this.answeringPlayer = null;
  }

  getCurrentAnsweringTeam() {
    const team = this.teams.find((team) =>
      team.players.some((player) => player.id === this.answeringPlayer?.id)
    );

    if (!team)
      throw new Error(`Team with player ${this.answeringPlayer?.id} not found`);

    return team;
  }

  setCurrentRound(round: Round): void {
    if (!this.doseRoundExist(round.id))
      throw new Error(`Round with id ${round.id} not found`);

    this.currentRound = round;
  }

  getFinalRound(): FinalRound {
    if (!this.finalRound) throw new Error(`Final round not found`);

    return this.finalRound;
  }

  setCurrentQuestion(question: Question): void {
    if (!this.currentRound) throw new Error(`Round not found`);

    if (!this.currentRound.doseQuestionExist(question.id))
      throw new Error(
        `Question with id ${question.id} not found in category with id ${question.id}`
      );

    if (question.isAnswered)
      throw new Error(`Question with id ${question.id} is already answered`);

    this.currentQuestion = question;
  }

  getCurrentQuestion(): Question {
    if (!this.currentQuestion) throw new Error(`No question is selected`);

    return this.currentQuestion;
  }

  removeQuestion(): void {
    this.currentQuestion = null;
  }

  validateAnswer(isAnswerValid: boolean): void {
    if (!this.answeringPlayer) throw new Error(`No player is answering`);

    const question = this.getCurrentQuestion();

    if (!isAnswerValid) {
      this.getCurrentAnsweringTeam().removeScore(question.value);
      this.removeAnsweringPlayer();
      this.removeQuestion();
      return;
    }


    question.markAsAnswered();
    this.getCurrentAnsweringTeam().addScore(question.value);
    this.removeAnsweringPlayer();
    this.removeQuestion();
  }

  validateFinalAnswer(team: Team, isAnswerValid: boolean): void {
    if (!this.finalRound) throw new Error(`Final round not found`);

    const teamAnswer = this.finalRound.getTeamAnswer(team.id);

    if(this.didAllTeamsFinalAnswered()){
      this.finalRound.finalQuestion.isAnswered = true;
    }

    if (isAnswerValid) {
      team.addScore(teamAnswer.value);
      teamAnswer.isValidated = true;
      return;
    }

    teamAnswer.isValidated = true;
    team.removeScore(teamAnswer.value);
  }

  didAllFinalAnswersValidated(): boolean {
    if (!this.finalRound) throw new Error(`Final round not found`);

    return this.finalRound.answers.every((answer) => answer.isValidated);
  }

  didAllTeamsFinalAnswered(): boolean {
    if (!this.finalRound) throw new Error(`Final round not found`);

    return this.teams.every((team) =>
      this.finalRound?.answers.some((answer) => answer.teamId === team.id)
    );
  }

  canGameStart(): boolean {
    const isTeamValid = this.teams.every((team) => team.players.length >= 1);
    const isRoundValid = this.rounds.length >= 1;
    const isNumberOfTeamsValid = this.teams.length >= 2;

    return isTeamValid && isRoundValid && isNumberOfTeamsValid;
  }

  startGame(): void {
    if (!this.canGameStart()) throw new Error(`Game can not start`);

    this.setCurrentRound(this.rounds[0]);
  }

  nextRound(): void {
    if (!this.currentRound) throw new Error(`Round not found`);

    const currentRoundIndex = this.rounds.findIndex(
      (round) => round.id === this.currentRound?.id
    );

    if (currentRoundIndex === this.rounds.length - 1)
      throw new Error(`No more rounds`);

    this.setCurrentRound(this.rounds[currentRoundIndex + 1]);
  }

  hasMoreRounds(): boolean {

    if (!this.currentRound) throw new Error(`Round not found`);

    const currentRoundIndex = this.rounds.findIndex(
      (round) => round.id === this.currentRound?.id
    );

    return currentRoundIndex < this.rounds.length - 1;
  }

  getWinningTeam(): Team {
    if (!this.currentRound) throw new Error(`Round not found`);

    const winningTeam = this.teams.reduce((prev, current) =>
      prev.score > current.score ? prev : current
    );

    return winningTeam;
  }

  getRoundById(roundId: string): Round {
    const round = this.rounds.find((round) => round.id === roundId);

    if (!round) {
      throw new Error(`Round with id ${roundId} not found`);
    }

    return round;
  }

  getQuestionById(questionId: string): Question {
    const round = this.rounds.find((round) =>
      round.doseQuestionExist(questionId)
    );

    if (!round) {
      throw new Error(`Question with id ${questionId} not found`);
    }

    const question = round.getQuestionById(questionId);

    if (!question) {
      throw new Error(`Question with id ${questionId} not found`);
    }

    return question;
  }
}
