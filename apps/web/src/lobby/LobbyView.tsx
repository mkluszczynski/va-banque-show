import { useGame } from "@/game/GameContext";
import { usePlayer } from "@/player/PlayerContext";
import { ErrorView } from "../common/utils/ErrorView";
import { AdminLobbyView } from "./AdminLobbyView";
import { PlayerLobbyView } from "./PlayerLobbyView";

export function LobbyView() {
  const gameContext = useGame();
  const playerContext = usePlayer();
  // const { rejoin } = useGameCommands();

  if (!gameContext.game) return ErrorView();
  if (!playerContext.player) return ErrorView();

  // rejoin();

  if (gameContext.game.admin?.id === playerContext.player.id)
    return <AdminLobbyView />;

  return <PlayerLobbyView />;
}
