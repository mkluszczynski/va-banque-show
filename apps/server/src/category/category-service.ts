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

  doesCategoryExist(id: string): boolean {
    return this.categoryRepository.doseCategoryExist(id);
  }

  removeCategoryById(id: string): void {
    this.removeCategoryById(id);
  }
}
