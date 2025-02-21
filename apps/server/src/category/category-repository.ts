import { Category } from "./category";
import * as fs from "fs";

export class CategoryRepository {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  public saveCategory(category: Category): void {
    const categories: Category[] = this.getCategories();
    const index = categories.findIndex(
      (cat: Category) => cat.id === category.id
    );
    if (index === -1) {
      categories.push(category);
    } else {
      categories[index] = category;
    }
    this.writeFile(categories);
  }

  public getCategories(): Category[] {
    const data = this.readFile();
    return data.map((cat: Category) => {
      const category = Category.fromJSON(cat);
      category.setQuestions(cat.questions);
      return category;
    });
  }

  public getCategoryById(id: string): Category | null {
    const categories: Category[] = this.getCategories();
    const cat = categories.find((cat: Category) => cat.id === id);
    if (!cat) return null;
    return cat;
  }

  public doseCategoryExist(id: string): boolean {
    const categories: Category[] = this.getCategories();
    return categories.some((cat: Category) => cat.id === id);
  }

  public removeCategoryById(id: string): void {
    const categories = this.getCategories();
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    this.writeFile(updatedCategories);
  }

  private readFile(): Category[] {
    if (!fs.existsSync(this.filePath)) {
      // return [];
      throw new Error(`File not found: ${this.filePath} | ${__dirname}`);
    }
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data);
  }

  private writeFile(data: Category[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf-8");
  }
}
