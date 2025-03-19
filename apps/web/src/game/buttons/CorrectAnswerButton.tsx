import { Button } from "@/components/ui/button";
import { useGameCommands } from "../useGameCommands";

export function CorrectAnswerButton() {
  const { validateAnswer } = useGameCommands();
  return <Button onClick={() => validateAnswer(true)}>Correct</Button>;
}
