import { Button } from "@/components/ui/button";
import { useWinner } from "../WinnerContext";
import { TeamView } from "@/team/TeamView";

export function WinnerView() {
  const { winner, setWinner } = useWinner();

  if (!winner) return null;

  return (
    <div className="flex flex-col  gap-4 ">
      <div className="text-xl">🏆 Winner 🏆</div>
      <TeamView
        team={winner}
        showScore
        className="h-auto border-amber-500 dark:border-amber-300"
      ></TeamView>
      <Button onClick={() => setWinner(null)}>Exit</Button>
    </div>
  );
}
