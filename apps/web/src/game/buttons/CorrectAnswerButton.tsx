import { Button } from "@/components/ui/button";
import { useGameCommands } from "../useGameCommands";

export function CorrectAnswerButton() {
  const { validateAnswer } = useGameCommands();
  return <Button onClick={() => validateAnswer(true)}>Correct</Button>;
}

export function CorrectFinalAnswerButton({ teamId }: { teamId: string }) {
  const { validateFinalAnswer } = useGameCommands();
  return (
    <Button onClick={() => validateFinalAnswer(teamId, true)}>Correct</Button>
  );
}
