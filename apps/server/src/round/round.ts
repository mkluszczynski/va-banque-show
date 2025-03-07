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
    this.categories = this.categories.filter(
      (category) => category.id !== categoryId
    );
  }
}
