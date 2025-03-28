import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useGame } from "@/game/GameContext";
import { RoundEditDialog } from "@/round/dialogs/RoundEditDialog";
import { useRoundCommands } from "@/round/useRoundCommands";
import { Trash } from "lucide-react";
import { Round } from "./Round";
import { AddRoundButton } from "./buttons/AddRoundButton";
import { FinalRound } from "@/final-round/FinalRound";
import { FinalRoundEditDialog } from "./dialogs/FinalRoundEditDialog";

export function RoundSettingsView() {
  const gameContext = useGame();

  if (!gameContext?.game) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Label className="text-xl">Rounds</Label>
        <AddRoundButton />
      </div>
      <ScrollArea className="h-[70vh] ">
        <div className="flex flex-col gap-2">
          {gameContext.game.rounds.map((round, index) => (
            <RoundSettingsListItem key={round.id} round={round} order={index} />
          ))}
          {gameContext.game.finalRound && (
            <FinalRoundSettings finalRound={gameContext.game.finalRound} />
          )}
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
      <CardHeader className="flex flex-row justify-between">
        <div className="text-lg font-bold">Round {order + 1}</div>
        <div className="flex items-center gap-2">
          <RoundEditDialog {...round} />
          <Button
            variant="destructive"
            onClick={() => {
              removeRound(round.id);
            }}
          >
            <Trash />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div>Multiplayer: {round.multiplier}</div>
        <Separator />
        <div>
          <div>Categories:</div>
          <div className="flex flex-col gap-1 mx-2">
            {round.categories.length === 0 && <div>No categories</div>}
            {round.categories.map((category) => (
              <div key={category.id} className="text-sm font-extralight">
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FinalRoundSettings({ finalRound }: { finalRound: FinalRound }) {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="flex flex-row justify-between">
        <div className="text-lg font-bold">Final round</div>
        <div className="flex items-center gap-2">
          <FinalRoundEditDialog />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div>Question: {finalRound.finalQuestion.question}</div>
      </CardContent>
    </Card>
  );
}
