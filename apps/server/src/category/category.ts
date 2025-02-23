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

  getQuestionById(questionId: string) {
    const question = this.questions.find((q) => q.id === questionId);

    if (!question) {
      throw new Error(`Question with id ${questionId} not found`);
    }

    return question;
  }

  doseQuestionExist(questionId: string) {
    return this.questions.some((question) => question.id === questionId);
  }

  markQuestionAsAnswered(questionId: string) {
    const question = this.getQuestionById(questionId);
    question.markAsAnswered();
  }

  static fromJSON(data: Category): Category {
    const category = new Category(data.name);
    category.id = data.id;
    const questions: Question[] = data.questions.map((q: Question) =>
      Question.fromJSON(q)
    );

    category.setQuestions(questions);

    return category;
  }
}
