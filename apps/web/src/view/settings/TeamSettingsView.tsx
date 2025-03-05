import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GameContext } from "@/context/GameContext";
import { Team } from "@/type/Team";
import { Trash } from "lucide-react";
import { useContext } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TeamEditDialog } from "@/components/dialog/TeamEditDialog";
import { useTeamCommands } from "@/hooks/commands/useTeamCommands";

export function TeamSettingsView() {
  const gameContext = useContext(GameContext);
  const { createTeam } = useTeamCommands();

  if (!gameContext?.game) return null;

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => createTeam("New team")}>Add team</Button>
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
