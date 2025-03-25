import { ErrorView } from "@/common/utils/ErrorView";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGame } from "@/game/GameContext";
import { useGameCommands } from "@/game/useGameCommands";
import { QuestionView } from "@/game/views/QuestionView";
import { TeamView } from "@/team/TeamView";
import { useTeamCommands } from "@/team/useTeamCommands";
import { useEffect, useState } from "react";
import { usePlayerCommands } from "@/player/usePlayerCommands";

export function PlayerFinalRoundView() {
  const { game } = useGame();
  const { isPlayerCapitan } = usePlayerCommands();

  if (!game?.finalRound) return <ErrorView />;

  return (
    <div className="flex flex-col gap-4 min-w-[50vw]">
      <QuestionView question={game.finalRound.finalQuestion} />

      {isPlayerCapitan() && <FinalAnswerView />}
      <div className="flex gap-4">
        {game.teams.map((team) => (
          <TeamView team={team} showScore className="h-auto"></TeamView>
        ))}
      </div>
    </div>
  );
}

function FinalAnswerView() {
  const { getPlayerTeam } = useTeamCommands();
  const { submitFinalAnswer } = useGameCommands();

  const { game } = useGame();
  const playerTeam = getPlayerTeam();

  const [canSubmit, setCanSubmit] = useState(false);
  const [didTeamAnswer, setDidTeamAnswer] = useState(false);

  const [points, setPoints] = useState(0);
  const [finalAnswer, setFinalAnswer] = useState("");

  const handleFinalAnswer = () => {
    if (!playerTeam) return;
    submitFinalAnswer(playerTeam.id, finalAnswer, points);
  };

  useEffect(() => {
    if (!game?.finalRound) return;
    setDidTeamAnswer(
      game.finalRound.answers.some((answer) => answer.teamId === playerTeam?.id)
    );
  }, [game, playerTeam]);

  useEffect(() => {
    if (!playerTeam) return;
    setCanSubmit(
      finalAnswer !== "" &&
        points > 0 &&
        points <= playerTeam?.score &&
        !didTeamAnswer
    );
  }, [finalAnswer, points, playerTeam, didTeamAnswer]);

  if (!playerTeam) return <ErrorView />;

  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="flex flex-row justify-between">
        <div className="text-lg font-bold">Final Answer</div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Final Answer"
          onChange={(e) => setFinalAnswer(e.target.value)}
          disabled={didTeamAnswer}
        />
        <div className="flex gap-4">
          <Input
            type="number"
            placeholder="Points"
            min={0}
            max={playerTeam.score}
            step={100}
            onChange={(e) => setPoints(+e.target.value)}
            disabled={didTeamAnswer}
          />
          <Button disabled={!canSubmit} onClick={handleFinalAnswer}>
            Answer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
