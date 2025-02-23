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

export function JoinGameDialog() {
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
          <Button type="submit">Join</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
