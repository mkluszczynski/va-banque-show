import { ErrorView } from "@/common/utils/ErrorView";
import { IncorrectFinalAnswerButton } from "@/game/buttons/IncorrectAnswerButton";
import { useGame } from "@/game/GameContext";
import { QuestionView } from "@/game/views/QuestionView";
import { TeamView } from "@/team/TeamView";
import { useFinalRoundCommands } from "./useFinalRoundCommands";
import { CorrectFinalAnswerButton } from "@/game/buttons/CorrectAnswerButton";
import { Button } from "@/components/ui/button";
import { useGameCommands } from "@/game/useGameCommands";
import { useEffect, useState } from "react";
import { Team } from "@/team/Team";
import { Check } from "lucide-react";

export function AdminFinalRoundView() {
  const { game } = useGame();

  const { finishGame, getWinningTeam } = useGameCommands();
  const { getTeamAnswer } = useFinalRoundCommands();

  const [winningTeam, setWinningTeam] = useState<Team | null>(null);

  useEffect(() => {
    getWinningTeam().then((team) => setWinningTeam(team ?? null));
  }, [getWinningTeam, game]);

  if (!game?.finalRound) return <ErrorView />;

  return (
    <div className="flex flex-col gap-4 min-w-[50vw]">
      <QuestionView question={game.finalRound.finalQuestion} showAnswer />
      <div className="flex gap-4">
        {game.teams.map((team) => (
          <TeamView team={team} showScore className="h-auto">
            <div className="flex gap-4 justify-center items-center">
              {!!getTeamAnswer(team.id)?.isValidated && (
                <Check className="text-green-400" />
              )}
              {game?.finalRound?.answers.some(
                (answer) => answer.teamId === team.id
              ) && (
                <div className="flex flex-col gap-4">
                  {getTeamAnswer(team.id) && (
                    <div className="text-sm font-light">
                      {getTeamAnswer(team.id)?.answer}
                    </div>
                  )}
                  {!getTeamAnswer(team.id)?.isValidated && (
                    <div className="flex gap-4">
                      <IncorrectFinalAnswerButton teamId={team.id} />
                      <CorrectFinalAnswerButton teamId={team.id} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </TeamView>
        ))}
      </div>
      <>
        <div className="text-amber-600 dark:text-amber-500">
          Winning Team: {winningTeam?.name}
        </div>
        <Button onClick={() => finishGame()}>End Game</Button>
      </>
    </div>
  );
}
