import { Question } from "../question/question";

export class FinalRound {
  public id: string;
  public finalQuestion: Question;

  constructor(id: string, finalQuestion: Question) {
    this.id = id;
    this.finalQuestion = finalQuestion;
  }
}
