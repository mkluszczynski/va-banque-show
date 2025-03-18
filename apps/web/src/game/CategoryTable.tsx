import { Separator } from "@/components/ui/separator";
import { Round } from "@/round/Round";

export function CategoryTable({ round }: { round: Round }) {
  return (
    <div className="flex justify-center items-stretch gap-4">
      {round.categories.map((category) => (
        <div key={category.id}>
          {category.name}
          <Separator />
          <div className="flex flex-col justify-center items-center gap-4">
            {category.questions.map((question) => (
              <div key={question.id}>
                {question.value}
                <Separator />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
