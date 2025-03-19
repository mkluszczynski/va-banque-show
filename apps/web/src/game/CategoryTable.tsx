import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Round } from "@/round/Round";
import { useGameCommands } from "./useGameCommands";

export function CategoryTable({
  round,
  canSelect,
}: {
  round: Round;
  canSelect?: boolean;
}) {
  const { selectQuestion } = useGameCommands();
  return (
    <div className="flex justify-around items-stretch gap-4 w-full">
      {round.categories.map((category) => (
        <div key={category.id} className="flex flex-col gap-4">
          <div>
            {category.name}
            <Separator />
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            {category.questions.map((question) => (
              <Button
                key={question.id}
                disabled={question.isAnswered}
                onClick={() => {
                  if (!canSelect) return;
                  selectQuestion(category.id, question.id);
                }}
              >
                {question.value}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
