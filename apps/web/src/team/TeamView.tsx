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
import { useGame } from "@/game/GameContext";
import { Button } from "@/components/ui/button";
import { Crown, Hand } from "lucide-react";
import { useGameCommands } from "@/game/useGameCommands";
import { Player } from "@/player/Player";

export function TeamView({
  team,
  showScore,
  showSelectToAnswer,
  children,
  className,
}: {
  team: Team;
  showScore?: boolean;
  showSelectToAnswer?: boolean;
  children?: JSX.Element;
  className?: string;
}) {
  const { game } = useGame();
  const { selectPlayerToAnswer } = useGameCommands();

  const handleSelectPlayer = (player: Player) => {
    if (!game) return;
    selectPlayerToAnswer(player.id);
  };

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
          <div className="flex justify-between items-center gap-4">
            <div key={player.id} className="flex items-center gap-2">
              {team?.capitan?.id === player.id && (
                <Crown className="text-yellow-400" />
              )}
              <Avatar>
                <AvatarFallback>{player.nickname[0]}</AvatarFallback>
              </Avatar>
              {player.nickname}
            </div>
            {showSelectToAnswer &&
              !game?.answeringPlayer &&
              game?.currentQuestion && (
                <Button
                  variant="ghost"
                  onClick={() => handleSelectPlayer(player)}
                >
                  <Hand />
                </Button>
              )}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-center">{children}</CardFooter>
    </Card>
  );
}
