import { Question } from "../question/question";

export class Category {
  public id: string = "";
  public name: string;
  public questions: Question[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addQuestion(question: Question) {
    this.questions.push(question);
  }

  setQuestions(questions: Question[]) {
    this.questions = questions;
  }

  static fromJSON(data: Category): Category {
    console.log(data);
    const category = new Category(data.name);
    category.id = data.id;
    category.setQuestions(
      data.questions.map((q: Question) => Question.fromJSON(q))
    );
    return category;
  }
}
