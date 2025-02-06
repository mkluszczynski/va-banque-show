import { Question } from "../question/question";

export class Category {
  public id: string;
  public name: string;
  public questions: Question[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  addQuestion(question: Question) {
    this.questions.push(question);
  }
}
