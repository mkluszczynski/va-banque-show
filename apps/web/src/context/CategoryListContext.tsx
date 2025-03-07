import { Category } from "@/type/Category";
import { createContext } from "react";

export type CategoryListContextType = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};

export const CategoryListContext = createContext<CategoryListContextType>({
  categories: [],
  setCategories: () => {},
});
