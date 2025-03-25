import { useGame } from "@/game/GameContext";
import { AdminFinalRoundView } from "./AdminFinalRound";
import { PlayerFinalRoundView } from "./PlayerFinalRound";
import { usePlayer } from "@/player/PlayerContext";
import { ErrorView } from "@/common/utils/ErrorView";

export function FinalRoundView() {
  const { game } = useGame();

  const { player } = usePlayer();

  if (!game) return ErrorView();
  if (!player) return ErrorView();

  // rejoin();

  if (game.admin?.id === player.id) return <AdminFinalRoundView />;

  return <PlayerFinalRoundView />;
}
