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
    this.categories.push(category);
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
  }

  removeCategoryById(categoryId: string) {
    this.categories = this.categories.filter(
      (category) => category.id !== categoryId
    );
  }
}
