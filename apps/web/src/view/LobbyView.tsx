import { GameContext } from "@/context/GameContext";
import { useContext } from "react";
import { PlayerContext } from "@/context/PlayerContext";
import { ErrorView } from "./ErrorView";
import { AdminLobbyView } from "./lobby/AdminLobbyView";
import { PlayerLobbyView } from "./lobby/PlayerLobbyView";

export function LobbyView() {
  const gameContext = useContext(GameContext);
  const playerContext = useContext(PlayerContext);

  if (!gameContext.game) return ErrorView();
  if (!playerContext.player) return ErrorView();

  if (gameContext.game.admin?.id === playerContext.player.id)
    return <AdminLobbyView />;

  return <PlayerLobbyView />;
}
