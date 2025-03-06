import { useGameCommands } from "@/hooks/commands/useGameCommands";
import { Button } from "../ui/button";

export function LeaveGameButton() {
  const { leaveGame } = useGameCommands();
  return <Button onClick={() => leaveGame()}>Leave game</Button>;
}
