
export class Question {
  public id: string;
  public question: string;
  public answer: string;
  public value: number;
  public isAnswered: boolean = false;
  public isBonus: boolean = false;

  constructor(
    id: string,
    question: string,
    answer: string,
    value:number 
  ) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.value = value;
  }

  markAsAnswered() {
    this.isAnswered = true;
  }

  setAsBonus() {
    this.isBonus = true;
  }

  static fromJSON(data: Question): Question {
    return new Question(data.id, data.question, data.answer, data.value);
  }
}
