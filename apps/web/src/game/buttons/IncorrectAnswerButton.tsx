import { Button } from "@/components/ui/button";
import { useGameCommands } from "../useGameCommands";

export function IncorrectAnswerButton() {
  const { validateAnswer } = useGameCommands();
  return (
    <Button variant="destructive" onClick={() => validateAnswer(false)}>
      Incorrect
    </Button>
  );
}
