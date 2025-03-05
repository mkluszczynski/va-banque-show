import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlayerContext } from "@/context/PlayerContext";
import { Team } from "@/type/Team";
import { useContext } from "react";

export function TeamView({
  team,
  onJoin,
}: {
  team: Team;
  onJoin?: (teamId: string) => void;
}) {
  const playerContext = useContext(PlayerContext);
  if (!playerContext.player) return null;

  const isPlayerInTeam = team.players.some(
    (player) => player.id === playerContext.player?.id
  );

  return (
    <Card className="w-64 h-[50vh] flex justify-between">
      <CardHeader>
        <div className="text-lg font-bold">{team.name}</div>
        <Separator />
      </CardHeader>
      <CardContent className="flex justify-start h-full flex-col gap-2 flex-wrap">
        {team.players.map((player) => (
          <div key={player.id} className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>{player.nickname[0]}</AvatarFallback>
            </Avatar>
            {player.nickname}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-center">
        {onJoin && !isPlayerInTeam && (
          <Button className="w-full" onClick={() => onJoin(team.id)}>
            Join
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
