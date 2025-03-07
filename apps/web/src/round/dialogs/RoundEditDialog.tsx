import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { RemoveCategoryFromRoundButton } from "../buttons/RemoveCategoryFromRoundButton";
import { Round } from "../Round";
import { AddCategoryToRoundDialog } from "./AddCategoryToRoundDialog";

export function RoundEditDialog(round: Round) {
  const [multiplier, setMultiplier] = useState(round.multiplier);

  const [open, setOpen] = useState(false);

  const onSave = () => {
    console.log("Save round", round.id, multiplier);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0">
          <Edit size={12} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center ">
        <DialogHeader className="">
          <DialogTitle>Edit round</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Label htmlFor="name">Multiplier</Label>
          <Input
            type="number"
            placeholder="Score"
            defaultValue={round.multiplier}
            step={1}
            onChange={(event) => setMultiplier(parseInt(event.target.value))}
          />

          <Separator />

          <div className="flex justify-between items-center">
            <Label htmlFor="name">Categories</Label>
            <AddCategoryToRoundDialog {...round} />
          </div>
          <ScrollArea className="h-[50vh]">
            <div className="flex flex-col gap-2 mx-2">
              {round.categories.length === 0 && <div>No categories</div>}
              <Accordion type="multiple">
                {round.categories.map((category) => (
                  <AccordionItem key={category.id} value={category.id}>
                    <AccordionTrigger className="flex justify-between items-center gap-1">
                      <div className="flex justify-between items-center w-full">
                        <div>{category.name}</div>
                        <RemoveCategoryFromRoundButton
                          roundId={round.id}
                          categoryId={category.id}
                        />
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
                              <div className="flex items-center">
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

        <DialogFooter>
          <Button type="submit" onClick={onSave} className="w-full">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
