import { Question } from "../question/question";

type FinalRoundAnswer = {
  teamId: string;
  value: number;
  answer: string;
  isValidated: boolean;
}

export class FinalRound {
  public id: string;
  public isLive: boolean = false;
  public finalQuestion: Question;
  public answers: FinalRoundAnswer[] = [];

  constructor(id: string, finalQuestion: Question) {
    this.id = id;
    this.finalQuestion = finalQuestion;
  }

  addAnswer(answer: FinalRoundAnswer) {
    this.answers.push(answer);
  }
  
  getTeamAnswer(teamId: string) {
    const teamAnswer = this.answers.find(answer => answer.teamId === teamId);

    if (!teamAnswer) {
      throw new Error(`Team with id ${teamId} not found`);
    }

    return teamAnswer;
  }

}