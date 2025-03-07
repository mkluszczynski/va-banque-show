import { Button } from "../components/ui/button";
import { useGameCommands } from "./useGameCommands";

export function LeaveGameButton() {
  const { leaveGame } = useGameCommands();
  return <Button onClick={() => leaveGame()}>Leave game</Button>;
}
