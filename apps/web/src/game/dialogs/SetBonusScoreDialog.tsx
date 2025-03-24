import { Question } from "@/category/types/Question";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useGameCommands } from "../useGameCommands";

export function SetBonusScoreDialog({ question }: { question: Question }) {
  const { setQuestionBonusScore } = useGameCommands();

  const [open, setOpen] = useState(false);
  const [bonusScore, setBonusScore] = useState(0);

  const handleSetBonusScore = () => {
    setQuestionBonusScore(question.id, bonusScore);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Set bonus score</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter bonus score</DialogTitle>
        </DialogHeader>
        <Input
          id="game-code"
          placeholder="Bonus score"
          type="number"
          onChange={(event) => setBonusScore(+event.target.value)}
        />
        <DialogFooter>
          <Button type="submit" onClick={handleSetBonusScore}>
            Set bonus score
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
