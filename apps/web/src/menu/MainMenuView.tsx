import { Button } from "@/components/ui/button";
import { JoinGameDialog } from "@/game/dialogs/JoinGameDialog";
import { useGameCommands } from "@/game/useGameCommands";
import { usePlayer } from "@/player/PlayerContext";

export function MainMenu() {
  const playerContext = usePlayer();
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
