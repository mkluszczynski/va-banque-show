import { useSocket } from "../common/socket/useSocket";
import { useCategoryList } from "./CategoryListContext";
import { Category } from "./types/Category";

export function useCategoryCommands() {
  const socket = useSocket();
  const categoryContext = useCategoryList();

  return {
    getAllCategories: () => {
      socket.emit("category:all", (categories: Category[]) => {
        categoryContext.setCategories(categories);
      });
    },
  };
}
