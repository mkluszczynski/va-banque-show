import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Button } from "@/components/ui/button";
import { JoinGameDialog } from "@/components/dialog/JoinGameDialog";
import { useGameCommands } from "@/hooks/commands/useGameCommands";

export function MainMenu() {
  const playerContext = useContext(PlayerContext);
  const { createGame } = useGameCommands();

  if (!playerContext) {
    return "Error: Player is null";
  }

  if (!playerContext.player) {
    return "Error: Player is null";
  }

  const onHostGame = () => {
    createGame();
  };

  return (
    <div>
      <p>Welcome {playerContext.player.nickname}</p>
      <div className="flex gap-2">
        <Button onClick={onHostGame}>Host Game</Button>
        <JoinGameDialog />
      </div>
    </div>
  );
}
