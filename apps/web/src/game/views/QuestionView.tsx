import { Question } from "@/category/types/Question";
import { useGameCommands } from "../useGameCommands";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeClosed, Star } from "lucide-react";
import { SetBonusScoreDialog } from "../dialogs/SetBonusScoreDialog";

export function QuestionView({
  question,
  showAnswer,
  showSkipButton,
}: {
  question: Question | null;
  showAnswer?: boolean;
  showSkipButton?: boolean;
}) {
  const { skipQuestion } = useGameCommands();
  console.log(question);
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold flex justify-center items-center gap-2">
            Question
            {question?.isBonus && <Star className="text-yellow-400" />}
          </div>
          <div className="flex gap-4">
            {showSkipButton && question?.isBonus && (
              <SetBonusScoreDialog question={question} />
            )}
            {showSkipButton && question && (
              <Button onClick={skipQuestion}>Skip</Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {question && (
          <div>
            {question.question} - {question.value}
          </div>
        )}
        {!question && <div>No question</div>}
        {question && showAnswer && (
          <QuestionAnswerView answer={question.answer} />
        )}
      </CardContent>
    </Card>
  );
}

export function QuestionAnswerView({ answer }: { answer: string }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div>
      {showAnswer && (
        <div className="flex items-center gap-2 ">
          <Eye size={12} />
          <div
            className="text-sm font-light cursor-pointer"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {answer}
          </div>
        </div>
      )}
      {!showAnswer && (
        <div className="flex items-center gap-2 cursor-pointer">
          <EyeClosed size={12} />
          <div
            className="text-sm font-light cursor-pointer"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            Click to show answer
          </div>
        </div>
      )}
    </div>
  );
}
