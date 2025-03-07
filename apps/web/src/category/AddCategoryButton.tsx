import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddCategoryButton() {
  return (
    <Button
      variant="ghost"
      className="p-0"
      // onClick={() => createTeam("New team")}
    >
      <Plus size={12} />
    </Button>
  );
}
