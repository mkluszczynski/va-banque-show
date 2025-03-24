import { Question } from "../question/question";
import { Category } from "./category";
import { CategoryRepository } from "./category-repository";

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  saveCategory(category: Category): void {
    this.categoryRepository.saveCategory(category);
  }

  getCategoryById(id: string): Category{
    const category = this.categoryRepository.getCategoryById(id);

    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }

    return category;
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

  getRandomQuestion(): Question {
    const categories = this.categoryRepository.getCategories();
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const questions = randomCategory.questions;
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    return randomQuestion;

  }

  getQuestionById(questionId: string): Question {
    const categories = this.categoryRepository.getCategories();
    const category = categories.find((category) =>
      category.doseQuestionExist(questionId)
    );

    if (!category) {
      throw new Error(`Question with id ${questionId} not found`);
    }

    const question = category.getQuestionById(questionId);

    if (!question) {
      throw new Error(`Question with id ${questionId} not found`);
    }

    return question;
  }


  doesCategoryExist(id: string): boolean {
    return this.categoryRepository.doseCategoryExist(id);
  }

  removeCategoryById(id: string): void {
    this.removeCategoryById(id);
  }
}
