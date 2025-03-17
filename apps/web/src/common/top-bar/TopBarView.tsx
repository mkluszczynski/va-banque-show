import { ThemeToggle } from "@/common/theme/ThemeToggle";
import { useGame } from "@/game/GameContext";
import { LeaveGameButton } from "@/game/buttons/LeaveGameButton";
import { LogoutButton } from "@/player/LogoutButton";
import { usePlayer } from "@/player/PlayerContext";

export function TopBarView() {
  const playerContext = usePlayer();
  const gameContext = useGame();

  return (
    <div className="absolute flex items-center gap-2 top-0 right-0 p-4">
      {gameContext.game && <LeaveGameButton />}
      {playerContext?.player && !gameContext.game && <LogoutButton />}
      <ThemeToggle />
    </div>
  );
}
