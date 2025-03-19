import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Team } from "./Team";
import { cn } from "@/lib/utils";
import { JSX } from "react";

export function TeamView({
  team,
  showScore,
  children,
  className,
}: {
  team: Team;
  showScore?: boolean;
  children?: JSX.Element;
  className?: string;
}) {
  return (
    <Card className={cn("w-64 h-[50vh] flex justify-between", className)}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">{team.name}</div>
          {showScore && <div>{team.score}</div>}
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="flex justify-start h-full flex-col gap-2 flex-wrap">
        {team.players.length === 0 && (
          <div className="text-sm font-extralight">No players</div>
        )}
        {team.players.map((player) => (
          <div key={player.id} className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>{player.nickname[0]}</AvatarFallback>
            </Avatar>
            {player.nickname}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-center">{children}</CardFooter>
    </Card>
  );
}
