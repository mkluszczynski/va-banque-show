import { ErrorView } from "@/common/utils/ErrorView";
import { CategoryTable } from "../CategoryTable";
import { useGame } from "../GameContext";
import { TeamView } from "@/team/TeamView";
import { Button } from "@/components/ui/button";
import { Player } from "@/player/Player";
import { useGameCommands } from "../useGameCommands";
import { useEffect, useState } from "react";
import { Team } from "@/team/Team";
import { QuestionView } from "./QuestionView";
import { IncorrectAnswerButton } from "../buttons/IncorrectAnswerButton";
import { CorrectAnswerButton } from "../buttons/CorrectAnswerButton";

export function AdminGameView() {
  const { game } = useGame();
  const { nextRound, hasMoreRounds, getWinningTeam, finishGame } =
    useGameCommands();

  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [hasMoreRoundsState, setHasMoreRoundsState] = useState(false);
  const [winningTeam, setWinningTeam] = useState<Team | null>(null);

  useEffect(() => {
    if (!game?.currentRound) return;
    if (!game.currentRound) return;
    setAllQuestionsAnswered(
      game.currentRound.categories.every((category) =>
        category.questions.every((question) => question.isAnswered)
      )
    );
    hasMoreRounds().then(setHasMoreRoundsState);
    getWinningTeam().then((team) => setWinningTeam(team ?? null));
  }, [game?.currentRound]);

  if (!game?.currentRound) return <ErrorView />;

  return (
    <div className="flex flex-col gap-4">
      <QuestionView question={game.currentQuestion} showAnswer showSkipButton />
      <CategoryTable round={game?.currentRound} canSelect showBonus />
      <div className="flex gap-4">
        {game.teams.map((team) => (
          <TeamView
            key={team.id}
            team={team}
            showScore
            showSelectToAnswer
            className="h-auto"
          >
            <div>
              {team.players.some(
                (player: Player) => game.answeringPlayer?.id == player.id
              ) && (
                <div className="flex gap-4">
                  <IncorrectAnswerButton />
                  <CorrectAnswerButton />
                </div>
              )}
            </div>
          </TeamView>
        ))}
      </div>
      {allQuestionsAnswered && hasMoreRoundsState && !game.currentQuestion && (
        <Button onClick={() => nextRound()}>Next Round</Button>
      )}
      {allQuestionsAnswered && !hasMoreRoundsState && !game.currentQuestion && (
        <>
          <div className="text-amber-600 dark:text-amber-500">
            Winning Team: {winningTeam?.name}
          </div>
          <Button onClick={() => finishGame()}>End Game</Button>
        </>
      )}
    </div>
  );
}
