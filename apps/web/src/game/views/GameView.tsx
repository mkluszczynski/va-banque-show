import { ErrorView } from "@/common/utils/ErrorView";
import { usePlayer } from "@/player/PlayerContext";
import { useGame } from "../GameContext";
import { AdminGameView } from "./AdminGameView";
import { PlayerGameView } from "./PlayerGameView";

export function GameView() {
  const gameContext = useGame();
  const playerContext = usePlayer();

  if (!gameContext.game) return ErrorView();
  if (!playerContext.player) return ErrorView();

  // rejoin();

  if (gameContext.game.admin?.id === playerContext.player.id)
    return <AdminGameView />;

  return <PlayerGameView />;
}
