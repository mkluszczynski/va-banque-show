import { Socket } from "socket.io";
import { CategoryService } from "./category-service";

export const categoryController = (
  socket: Socket,
  categoryService: CategoryService
) => {
  socket.on("category:all", getAllCategories);
  function getAllCategories() {
    console.log("[Server][categoryController] Getting all categories.");
    const categories = categoryService.getCategories();
    socket.emit("category:all:success", { categories });
  }
};
