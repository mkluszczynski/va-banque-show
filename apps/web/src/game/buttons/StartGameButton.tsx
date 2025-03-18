import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useGame } from "../GameContext";
import { useGameCommands } from "../useGameCommands";

export function StartGameButton() {
  const { canGameStart } = useGameCommands();
  const game = useGame();

  const [canStart, setCanStart] = useState(false);

  useEffect(() => {
    canGameStart().then(setCanStart);
  }, [game.game, canGameStart]);

  return <Button disabled={!canStart}>Start Game</Button>;
}
