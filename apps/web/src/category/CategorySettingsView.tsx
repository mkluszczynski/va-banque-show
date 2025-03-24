import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";
import { AddCategoryButton } from "./AddCategoryButton";
import { useCategoryList } from "./CategoryListContext";
import { Category } from "./types/Category";
import { Question } from "./types/Question";
import { SetBonusButton } from "./SetBonusButton";
import { Round } from "@/round/Round";

export function CategorySettingsView() {
  const categoryContext = useCategoryList();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Label className="text-xl">Categories</Label>
        <AddCategoryButton />
      </div>
      <ScrollArea className="h-[70vh] ">
        <div className="flex flex-col gap-2">
          {categoryContext.categories.map((category) => (
            <CategorySettingsListItem key={category.id} category={category} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function CategorySettingsListItem({ category }: { category: Category }) {
  return (
    <Card className="flex flex-col gap-2 p-0">
      <Accordion type="single" collapsible>
        <CardHeader className="flex flex-row justify-between">
          <AccordionItem value={category.id} className="w-full">
            <AccordionTrigger className="flex justify-between items-center w-full">
              <div className="flex justify-between items-center w-full">
                <div>{category.name}</div>
                <div>
                  <Button variant="ghost">
                    <Edit />
                  </Button>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                {category.questions.map((question, index) => (
                  <>
                    {index > 0 && <Separator />}
                    <QuestionListItem question={question} />
                  </>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </CardHeader>
      </Accordion>
    </Card>
  );
}

export function QuestionListItem({
  round,
  question,
}: {
  round?: Round;
  question: Question;
}) {
  return (
    <div key={question.id} className="flex justify-between items-center m-1">
      <div className="flex flex-col gap-0.5">
        <div className="text-sm font-semibold">{question.question}</div>
        <div className="text-xs font-extralight">{question.answer}</div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="text-xs font-extralight">{question.value}</div>
        {round && <SetBonusButton question={question} round={round} />}
      </div>
    </div>
  );
}
