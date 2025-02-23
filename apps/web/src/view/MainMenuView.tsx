import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Button } from "@/components/ui/button";
import { JoinGameDialog } from "@/dialog/JoinGameDialog";

export function MainMenu() {
  const playerContext = useContext(PlayerContext);

  if (!playerContext) {
    return "Error: Player is null";
  }

  if (!playerContext.player) {
    return "Error: Player is null";
  }

  return (
    <div>
      <p>Welcome {playerContext.player.nickname}</p>
      <div className="flex gap-2">
        <Button>Host Game</Button>
        <JoinGameDialog />
      </div>
    </div>
  );
}
