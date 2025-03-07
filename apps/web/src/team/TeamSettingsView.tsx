import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useGame } from "@/game/GameContext";
import { useTeamCommands } from "@/team/useTeamCommands";
import { Plus, Trash } from "lucide-react";
import { Team } from "./Team";
import { TeamEditDialog } from "./TeamEditDialog";

export function TeamSettingsView() {
  const gameContext = useGame();
  const { createTeam } = useTeamCommands();

  if (!gameContext?.game) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Label className="text-xl">Teams</Label>
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => createTeam("New team")}
        >
          <Plus size={12} />
        </Button>
      </div>
      <ScrollArea className="h-[70vh] ">
        <div className="flex flex-col gap-2">
          {gameContext.game.teams.map((team) => (
            <TeamSettingsListItem key={team.id} {...team} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function TeamSettingsListItem(team: Team) {
  const { removeTeam } = useTeamCommands();
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="flex flex-row justify-between">
        <div className="text-lg font-bold">{team.name}</div>
        <div className="flex items-center gap-2">
          <TeamEditDialog {...team} />
          <Button
            variant="destructive"
            onClick={() => {
              removeTeam(team.id);
            }}
          >
            <Trash />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div>Score: {team.score}</div>
        <Separator />
        <div>
          <div>Players:</div>
          {team.players.map((player) => (
            <div key={player.id}> - {player.nickname}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
