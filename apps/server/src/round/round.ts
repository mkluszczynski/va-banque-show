import { Category } from "../category/category";

export class Round {
  public id: string;
  public multiplier: number;

  public categories: Category[] = [];

  constructor(id: string, multiplier: number) {
    this.id = id;
    this.multiplier = multiplier;
  }

  addCategory(category: Category) {
    if (this.checkIfCategoryExist(category.id))
      throw new Error("Category already exist");
    this.categories.push(category);
  }

  getQuestionById(questionId: string) {
    const category = this.categories.find((category) =>
      category.questions.some((question) => question.id === questionId)
    );

    if (!category) throw new Error("Question not found");

    const question = category.questions.find((question) => question.id === questionId);
    
    if (!question) throw new Error("Question not found");

    return question;
  }

  checkIfCategoryExist(categoryId: string) {
    return this.categories.some((category) => category.id === categoryId);
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
  }

  douseCategoryExist(categoryId: string) {
    return this.categories.some((category) => category.id === categoryId);
  }

  doseQuestionExist(questionId: string) {
    return this.categories.some((category) =>
      category.questions.some((question) => question.id === questionId)
    );
  }

  removeCategoryById(categoryId: string) {
    if (!this.douseCategoryExist(categoryId))
      throw new Error("Category not found");
    this.categories = this.categories.filter(
      (category) => category.id !== categoryId
    );
  }

  markRandomQuestionAsBonus(){
    const randomCategory = this.categories[Math.floor(Math.random() * this.categories.length)];
    const randomQuestion = randomCategory.questions[Math.floor(Math.random() * randomCategory.questions.length)];
    if(randomQuestion.isBonus) this.markRandomQuestionAsBonus();
    randomQuestion.isBonus = true;
  }

  setQuestionAsBonus(questionId: string){
    const question = this.getQuestionById(questionId);
    question.isBonus = !question.isBonus;
  }
}
