import { useCategoryList } from "@/category/CategoryListContext";
import { Category } from "@/category/types/Category";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Separator } from "../../components/ui/separator";
import { Round } from "../Round";
import { useRoundCommands } from "../useRoundCommands";

export function AddCategoryToRoundDialog(round: Round) {
  const categoryListContext = useCategoryList();
  const { addCategoryToRound } = useRoundCommands();

  const [uniqueCategory, setUniqueCategory] = useState<Category[]>([]);

  useEffect(() => {
    const uniqueCategory = categoryListContext.categories.filter(
      (category) =>
        !round.categories.find(
          (roundCategory) => roundCategory.id === category.id
        )
    );
    console.log("uniqueCategory", uniqueCategory);

    setUniqueCategory(uniqueCategory);
  }, [categoryListContext.categories, round.categories]);

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0">
          <Plus size={12} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center ">
        <DialogHeader className="">
          <DialogTitle>Select category</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Separator />

          <ScrollArea className="h-[50vh]">
            <div className="flex flex-col gap-2 mx-2">
              {categoryListContext.categories.length === 0 && (
                <div>No categories</div>
              )}
              <Accordion type="multiple">
                {uniqueCategory.map((category) => (
                  <AccordionItem value={category.id}>
                    <AccordionTrigger className="flex justify-between items-center w-full gap-1">
                      <div className="flex justify-between items-center w-full">
                        <div>{category.name}</div>
                        <Button
                          variant={"ghost"}
                          className="p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            addCategoryToRound(round.id, category.id);
                            setOpen(false);
                          }}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <AccordionItem value={category.id}>
                        {category.questions.map((question, index) => (
                          <>
                            {index > 0 && <Separator />}
                            <div className="flex justify-between items-center m-1">
                              <div className="flex flex-col gap-0.5">
                                <div className="text-sm font-semibold">
                                  {question.question}
                                </div>
                                <div className="text-xs font-extralight">
                                  {question.answer}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-xs font-extralight">
                                  {question.value}
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                      </AccordionItem>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
