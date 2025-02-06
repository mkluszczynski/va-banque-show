import { Category } from "../category/category";

export class Round {
  public id: string;
  public multiplier: number;

  public categories: Category[] = [];

  constructor(id: string, multiplier: number) {
    this.id = id;
    this.multiplier = multiplier;
  }
}
