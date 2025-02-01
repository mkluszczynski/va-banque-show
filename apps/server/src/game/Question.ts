import { QuestionValue } from "../types/QuestionValue";

export class Question {
  public id: string;
  public question: string;
  public answer: string;
  public value: QuestionValue;

  constructor(
    id: string,
    question: string,
    answer: string,
    value: QuestionValue
  ) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.value = value;
  }
}
