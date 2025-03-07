import { useSocket } from "../common/socket/useSocket";
import { Category } from "./types/Category";

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
