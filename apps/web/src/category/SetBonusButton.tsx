import { Round } from "@/round/Round";
import { Question } from "./types/Question";
import { Button } from "@/components/ui/button";
import { Star, StarOff } from "lucide-react";
import { useGameCommands } from "@/game/useGameCommands";

export function SetBonusButton({
  round,
  question,
}: {
  round: Round;
  question: Question;
}) {
  const { setQuestionAsBonus } = useGameCommands();

  const handleClick = () => {
    setQuestionAsBonus(round.id, question.id);
  };

  return (
    <Button variant="ghost" onClick={handleClick}>
      {question.isBonus && <Star className="text-yellow-500" />}
      {!question.isBonus && <StarOff />}
    </Button>
  );
}
