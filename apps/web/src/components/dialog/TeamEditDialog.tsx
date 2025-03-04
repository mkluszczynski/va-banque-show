import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Team } from "@/type/Team";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useTeamCommands } from "@/hooks/commands/useTeamCommands";
import { useState } from "react";

export function TeamEditDialog(team: Team) {
  const { kickPlayer, editTeam } = useTeamCommands();
  const [name, setName] = useState(team.name);
  const [score, setScore] = useState(team.score);

  const [open, setOpen] = useState(false);

  const onSave = () => {
    editTeam(team.id, name, score);
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
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            placeholder="Team name"
            defaultValue={team.name}
            onChange={(event) => setName(event.target.value)}
          />

          <Separator />

          <Label htmlFor="name">Score</Label>
          <Input
            type="number"
            placeholder="Score"
            defaultValue={team.score}
            step={100}
            onChange={(event) => setScore(parseInt(event.target.value))}
          />

          <Separator />

          <Label htmlFor="name">Players</Label>
          <div className="flex flex-col gap-2">
            {team.players.length === 0 && <div>No players</div>}
            {team.players.map((player, index) => (
              <>
                {index > 0 && <Separator />}
                <div className="flex  justify-between items-center gap-4">
                  <div key={player.id}> - {player.nickname}</div>
                  <Button
                    variant="destructive"
                    onClick={() => kickPlayer(team.id, player.id)}
                  >
                    Kick
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
