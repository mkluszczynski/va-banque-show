import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Team } from "@/type/Team";

export function TeamView({
  team,
  onJoin,
}: {
  team: Team;
  onJoin?: (teamId: string) => void;
}) {
  return (
    <Card className="w-64 flex justify-between">
      <CardHeader>{team.name}</CardHeader>
      <CardContent>
        {team.players.map((player) => (
          <div key={player.id}>{player.nickname}</div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-center">
        {onJoin && (
          <Button className="w-full" onClick={() => onJoin(team.id)}>
            Join
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
