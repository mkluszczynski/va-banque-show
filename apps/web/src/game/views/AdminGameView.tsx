import { ErrorView } from "@/common/utils/ErrorView";
import { CategoryTable } from "../CategoryTable";
import { useGame } from "../GameContext";
import { TeamView } from "@/team/TeamView";
import { Button } from "@/components/ui/button";
import { Player } from "@/player/Player";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Question } from "@/category/types/Question";

export function AdminGameView() {
  const { game } = useGame();

  if (!game?.currentRound) return <ErrorView />;

  return (
    <div className="flex flex-col gap-4">
      <QuestionView question={game.currentQuestion} showAnswer />
      <CategoryTable round={game?.currentRound} />
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
  return (
    <Card>
      <CardHeader>
        <div className="text-lg font-bold">Question</div>
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
  return <Button>Correct</Button>;
}

export function IncorrectAnswer() {
  return <Button variant="destructive">Incorrect</Button>;
}
