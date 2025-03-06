import { LeaveGameButton } from "@/components/buttons/LeaveGameButton";
import { LogoutButton } from "@/components/buttons/LogoutButton";
import { ThemeToggle } from "@/components/buttons/ThemeToggle";
import { GameContext } from "@/context/GameContext";
import { PlayerContext } from "@/context/PlayerContext";
import { useContext } from "react";

export function TopBarView() {
  const playerContext = useContext(PlayerContext);
  const gameContext = useContext(GameContext);

  return (
    <div className="absolute flex items-center gap-2 top-0 right-0 p-4">
      {gameContext.game && <LeaveGameButton />}
      {playerContext?.player && !gameContext.game && <LogoutButton />}
      <ThemeToggle />
    </div>
  );
}
