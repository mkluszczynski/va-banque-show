import { CategoryListContext } from "@/context/CategoryListContext";
import { useSocket } from "@/hooks/useSocket";
import { Category } from "@/type/Category";
import { useEffect, useState } from "react";

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
