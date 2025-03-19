import { ErrorView } from "@/common/utils/ErrorView";
import { useGame } from "../GameContext";
import { CategoryTable } from "../CategoryTable";
import { Button } from "@/components/ui/button";
import { useGameCommands } from "../useGameCommands";

export function PlayerGameView() {
  const { game } = useGame();
  const { dispatchAnswer } = useGameCommands();

  if (!game?.currentRound) return <ErrorView />;

  return (
    <div className="flex flex-col gap-4">
      <CategoryTable round={game?.currentRound} />
      <Button disabled={!!game.answeringPlayer} onClick={dispatchAnswer}>
        Answer
      </Button>
    </div>
  );
}
