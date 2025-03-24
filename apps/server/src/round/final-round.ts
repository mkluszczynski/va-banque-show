import { Question } from "../question/question";

type FinalRoundAnswer = {
  teamId: string;
  value: number;
  answer: string;
}

export class FinalRound {
  public id: string;
  public finalQuestion: Question;
  public answers: FinalRoundAnswer[] = [];

  constructor(id: string, finalQuestion: Question) {
    this.id = id;
    this.finalQuestion = finalQuestion;
  }
}
