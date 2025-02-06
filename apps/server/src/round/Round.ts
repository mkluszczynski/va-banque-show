import { Category } from "../category/Category";

export class Round {
  public id: string;
  public multiplier: number;

  public categories: Category[] = [];

  constructor(id: string, multiplier: number) {
    this.id = id;
    this.multiplier = multiplier;
  }
}
