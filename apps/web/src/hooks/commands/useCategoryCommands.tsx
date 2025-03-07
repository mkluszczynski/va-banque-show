import { Category } from "@/type/Category";
import { useSocket } from "../useSocket";

export function useCategoryCommands() {
  const socket = useSocket();

  return {
    getAllCategories: () => {
      let categories: Category[] = [];
      socket.emit("category:all", (c: Category[]) => {
        console.log("socket", c);

        categories = c;
      });
      return categories;
    },
  };
}
