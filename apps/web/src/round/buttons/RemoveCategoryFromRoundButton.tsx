import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import { useRoundCommands } from "../useRoundCommands";

export function RemoveCategoryFromRoundButton({
  roundId,
  categoryId,
}: {
  roundId: string;
  categoryId: string;
}) {
  const { removeCategoryFromRound } = useRoundCommands();

  return (
    <Button
      variant="ghost"
      className="p-0"
      onClick={(e) => {
        e.stopPropagation();
        removeCategoryFromRound(roundId, categoryId);
      }}
    >
      <Minus size={12} />
    </Button>
  );
}
