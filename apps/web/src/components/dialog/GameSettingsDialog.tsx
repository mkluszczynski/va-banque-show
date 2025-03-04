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
import { Bolt } from "lucide-react";

export function GameSettingsDialog() {
  const onSave = () => {
    //
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Bolt />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter game code</DialogTitle>
        </DialogHeader>
        <Input id="game-code" placeholder="Game code" />
        <DialogFooter>
          <Button type="submit" onClick={onSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
