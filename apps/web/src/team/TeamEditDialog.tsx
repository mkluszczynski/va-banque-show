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
import { Separator } from "@/components/ui/separator";
import { useTeamCommands } from "@/team/useTeamCommands";
import { Label } from "@radix-ui/react-label";
import { Edit, LogOut, Move } from "lucide-react";
import { useState } from "react";
import { Team } from "./Team";
import { Player } from "@/player/Player";
import { useGame } from "@/game/GameContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TeamEditDialog(team: Team) {
  const { editTeam } = useTeamCommands();
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
        <Button variant="ghost" className="p-0">
          <Edit size={12} />
        </Button>
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
                <TeamPlayerListItem key={index} team={team} player={player} />
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

function TeamPlayerListItem({ team, player }: { team: Team; player: Player }) {
  const { kickPlayer } = useTeamCommands();
  return (
    <div className="flex  justify-between items-center gap-4">
      <div key={player.id}> - {player.nickname}</div>
      <div className="flex justify-center items-center gap-4">
        <MovePlayerDialog player={player} />
        <Button
          variant="destructive"
          onClick={() => kickPlayer(team.id, player.id)}
        >
          <LogOut size={12} />
        </Button>
      </div>
    </div>
  );
}

function MovePlayerDialog({ player }: { player: Player }) {
  const { game } = useGame();
  const { movePlayer } = useTeamCommands();

  const defaultTeam = game?.teams.find((team) =>
    team.players.some((p) => p.id === player.id)
  )?.id;

  const onTeamSelect = (selectedTeamId: string) => {
    if (!game) return;
    movePlayer(selectedTeamId, player.id);
  };

  if (!game) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0">
          <Move size={12} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center w-64">
        <DialogHeader className="">
          <DialogTitle>Select team</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Select defaultValue={defaultTeam} onValueChange={onTeamSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select team" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Teams</SelectLabel>
                {game.teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
}
