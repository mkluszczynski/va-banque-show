import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { GameContext } from "@/context/GameContext";
import { Trash } from "lucide-react";
import { useContext } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Round } from "@/type/Round";
import { useRoundCommands } from "@/hooks/commands/useRoundCommands";

export function RoundSettingsView() {
  const gameContext = useContext(GameContext);
  const { createRound } = useRoundCommands();

  if (!gameContext?.game) return null;

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => createRound()}>Add round</Button>
      <ScrollArea className="h-[70vh] ">
        <div className="flex flex-col gap-2">
          {gameContext.game.rounds.map((round, index) => (
            <RoundSettingsListItem key={round.id} round={round} order={index} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function RoundSettingsListItem({
  round,
  order,
}: {
  round: Round;
  order: number;
}) {
  const { removeRound } = useRoundCommands();

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>Round {order + 1}</CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div>
          <div>Categories:</div>
          {round.categories.map((category) => (
            <div key={category.id}> - {category.name}</div>
          ))}
        </div>
        <Separator />
        <div>Multiplayer: {round.multiplier}</div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {/* <TeamEditDialog {...team} /> */}
        <Button
          variant="destructive"
          onClick={() => {
            removeRound(round.id);
          }}
        >
          <Trash />
        </Button>
      </CardFooter>
    </Card>
  );
}
