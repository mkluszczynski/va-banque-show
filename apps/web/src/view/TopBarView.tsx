import { LogoutButton } from "@/components/LogoutButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PlayerContext } from "@/context/PlayerContext";
import { useContext } from "react";

export function TopBarView() {
  const playerContext = useContext(PlayerContext);

  return (
    <div className="absolute flex items-center gap-2 top-0 right-0 p-4">
      {playerContext?.player && <LogoutButton />}
      <ThemeToggle />
    </div>
  );
}
