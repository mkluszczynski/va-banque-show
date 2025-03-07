import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRoundCommands } from "./useRoundCommands";

export function AddRoundButton() {
  const { createRound } = useRoundCommands();

  return (
    <Button variant="ghost" className="p-0" onClick={() => createRound()}>
      <Plus size={12} />
    </Button>
  );
}
