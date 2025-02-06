import { Question } from "../question/Question";

export class FinalRound {
  public id: string;
  public finalQuestion: Question;

  constructor(id: string, finalQuestion: Question) {
    this.id = id;
    this.finalQuestion = finalQuestion;
  }
}
