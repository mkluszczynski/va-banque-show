import { ErrorView } from "@/common/utils/ErrorView";
import { useGame } from "../GameContext";
import { CategoryTable } from "../CategoryTable";
import { Button } from "@/components/ui/button";
import { useGameCommands } from "../useGameCommands";
import { QuestionView } from "./QuestionView";
import { TeamView } from "@/team/TeamView";

export function PlayerGameView() {
  const { game } = useGame();
  const { dispatchAnswer } = useGameCommands();

  if (!game?.currentRound) return <ErrorView />;

  return (
    <div className="flex flex-col gap-4 min-w-[50vw]">
      <QuestionView question={game.currentQuestion} />
      <CategoryTable round={game?.currentRound} />
      <div className="flex gap-4">
        {game.teams.map((team) => (
          <TeamView
            key={team.id}
            team={team}
            showScore
            className="h-auto"
          ></TeamView>
        ))}
      </div>
      <Button
        disabled={!!game.answeringPlayer || !game.currentQuestion}
        onClick={dispatchAnswer}
      >
        {game.answeringPlayer
          ? `${game.answeringPlayer.nickname} is answering...`
          : "Answer"}
      </Button>
    </div>
  );
}
