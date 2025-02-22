import { QuestionValue } from "../types/question-value";

export class Question {
  public id: string;
  public question: string;
  public answer: string;
  public value: QuestionValue;
  public isAnswared: boolean = false;

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

  markAsAnswared() {
    this.isAnswared = true;
  }

  static fromJSON(data: Question): Question {
    return new Question(data.id, data.question, data.answer, data.value);
  }
}
