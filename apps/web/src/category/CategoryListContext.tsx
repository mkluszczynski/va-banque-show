import { useSocket } from "@/common/socket/useSocket";
import { createContext, use, useEffect, useState } from "react";
import { Category } from "./types/Category";

export type CategoryListContextType = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};

const CategoryListContext = createContext<CategoryListContextType>({
  categories: [],
  setCategories: () => {},
});

export function CategoryListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const socket = useSocket();

  useEffect(() => {
    socket.emit("category:all", (categories: Category[]) => {
      setCategories(categories);
    });
  }, [socket]);

  return (
    <CategoryListContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryListContext.Provider>
  );
}

export const useCategoryList = () => {
  return use(CategoryListContext);
};
