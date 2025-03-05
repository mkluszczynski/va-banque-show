import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Round } from "@/type/Round";

export function RoundEditDialog(round: Round) {
  const [multiplier, setMultiplier] = useState(round.multiplier);

  const [open, setOpen] = useState(false);

  const onSave = () => {
    console.log("Save round", round.id, multiplier);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center ">
        <DialogHeader className="">
          <DialogTitle>Edit team</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Label htmlFor="name">Multiplier</Label>
          <Input
            type="number"
            placeholder="Score"
            defaultValue={round.multiplier}
            step={1}
            onChange={(event) => setMultiplier(parseInt(event.target.value))}
          />

          <Separator />

          <Label htmlFor="name">Categories</Label>
          <div className="flex flex-col gap-2">
            {round.categories.length === 0 && <div>No categories</div>}
            {round.categories.map((category, index) => (
              <>
                {index > 0 && <Separator />}
                <div className="flex  justify-between items-center gap-4">
                  <div key={category.id}> - {category.name}</div>
                  <Button
                    variant="outline"
                    // onClick={() => kickPlayer(team.id, player.id)}
                  >
                    Edit
                  </Button>
                </div>
              </>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={onSave} className="w-full">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
