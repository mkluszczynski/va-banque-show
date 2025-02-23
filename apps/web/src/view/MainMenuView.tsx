import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

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
      <div className="flex space-x-4">
        <button>Host Game</button>
        <button>Join Game</button>
      </div>
    </div>
  );
}
