import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useGame } from "../GameContext";
import { useGameCommands } from "../useGameCommands";

export function StartGameButton() {
  const { canGameStart, startGame } = useGameCommands();
  const game = useGame();

  const [canStart, setCanStart] = useState(false);

  useEffect(() => {
    canGameStart().then(setCanStart);
  }, [game.game, canGameStart]);

  const handleStartGame = () => {
    if (!canStart) return;
    startGame();
  };

  return (
    <Button disabled={!canStart} onClick={handleStartGame}>
      Start Game
    </Button>
  );
}
