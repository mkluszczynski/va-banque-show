import { Category } from "@/category/types/Category";

export type Round = {
  id: string;
  multiplier: number;
  categories: Category[];
};
