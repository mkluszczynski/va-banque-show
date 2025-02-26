import { GameContext } from "@/context/GameContext";
import { useContext } from "react";
import { PlayerContext } from "@/context/PlayerContext";
import { ErrorView } from "../ErrorView";
import { AdminLobbyView } from "./AdminLobbyView";
import { PlayerLobbyView } from "./PlayerLobbyView";
import { useGameCommands } from "@/hooks/commands/useGameCommands";

export function LobbyView() {
  const gameContext = useContext(GameContext);
  const playerContext = useContext(PlayerContext);
  const { rejoin } = useGameCommands();

  if (!gameContext.game) return ErrorView();
  if (!playerContext.player) return ErrorView();

  rejoin();

  if (gameContext.game.admin?.id === playerContext.player.id)
    return <AdminLobbyView />;

  return <PlayerLobbyView />;
}
