import { ErrorView } from "@/common/utils/ErrorView";
import { CategoryTable } from "../CategoryTable";
import { useGame } from "../GameContext";

export function AdminGameView() {
  const { game } = useGame();

  if (!game?.currentRound) return <ErrorView />;

  return (
    <div>
      <CategoryTable round={game?.currentRound} />
    </div>
  );
}
