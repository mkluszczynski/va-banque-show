import { Question } from "@/category/types/Question";
import { useGameCommands } from "../useGameCommands";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
