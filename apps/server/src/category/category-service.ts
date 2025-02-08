import { Category } from "./category";
import { CategoryRepository } from "./category-repository";

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  saveCategory(category: Category): void {
    this.categoryRepository.saveCategory(category);
  }

  getCategoryById(id: string): Category | null {
    return this.categoryRepository.getCategoryById(id);
  }

  getCategories(): Category[] {
    return this.categoryRepository.getCategories();
  }

  getRandomCategories(count: number): Category[] {
    const categories = this.categoryRepository.getCategories();
    const randomCategories: Category[] = [];

    for (let i = 0; i < count; i++) {
      const filteredCategories = categories.filter(
        (category) => !randomCategories.includes(category)
      );
      const randomIndex = Math.floor(Math.random() * filteredCategories.length);
      randomCategories.push(filteredCategories[randomIndex]);
    }

    return randomCategories;
  }

  doesCategoryExist(id: string): boolean {
    return this.categoryRepository.doseCategoryExist(id);
  }

  removeCategoryById(id: string): void {
    this.removeCategoryById(id);
  }
}
