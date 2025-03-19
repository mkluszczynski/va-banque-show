import { ErrorView } from "@/common/utils/ErrorView";
import { CategoryTable } from "../CategoryTable";
import { useGame } from "../GameContext";
import { TeamView } from "@/team/TeamView";
import { Button } from "@/components/ui/button";
import { Player } from "@/player/Player";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Question } from "@/category/types/Question";
import { useGameCommands } from "../useGameCommands";
import { useEffect, useState } from "react";
import { Team } from "@/team/Team";

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
      <QuestionView question={game.currentQuestion} showAnswer />
      <CategoryTable round={game?.currentRound} canSelect />
      <div className="flex gap-4">
        {game.teams.map((team) => (
          <TeamView key={team.id} team={team} showScore className="h-auto">
            <div>
              {team.players.some(
                (player: Player) => game.answeringPlayer?.id == player.id
              ) && (
                <div className="flex gap-4">
                  <IncorrectAnswer />
                  <CorrectAnswer />
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
        <div>
          <div>Winning Team: {winningTeam?.name}</div>
          <Button onClick={() => finishGame()}>End Game</Button>
        </div>
      )}
    </div>
  );
}

export function QuestionView({
  question,
  showAnswer,
}: {
  question: Question | null;
  showAnswer?: boolean;
}) {
  const { skipQuestion } = useGameCommands();
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">Question</div>
          {question && <Button onClick={skipQuestion}>Skip</Button>}
        </div>
      </CardHeader>
      <CardContent>
        {question && <div>{question.question}</div>}
        {!question && <div>No question</div>}
        {question && showAnswer && <div>{question.answer}</div>}
      </CardContent>
    </Card>
  );
}

export function CorrectAnswer() {
  const { validateAnswer } = useGameCommands();
  return <Button onClick={() => validateAnswer(true)}>Correct</Button>;
}

export function IncorrectAnswer() {
  const { validateAnswer } = useGameCommands();
  return (
    <Button variant="destructive" onClick={() => validateAnswer(false)}>
      Incorrect
    </Button>
  );
}
