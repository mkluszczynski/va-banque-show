import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGameCommands } from "@/hooks/commands/useGameCommands";

export function JoinGameDialog() {
  const { joinGame } = useGameCommands();

  const onJoinGame = () => {
    const gameId = (document.getElementById("game-code") as HTMLInputElement)
      ?.value;
    if (!gameId) return;
    joinGame(gameId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Join Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter game code</DialogTitle>
        </DialogHeader>
        <Input id="game-code" placeholder="Game code" />
        <DialogFooter>
          <Button type="submit" onClick={onJoinGame}>
            Join
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
