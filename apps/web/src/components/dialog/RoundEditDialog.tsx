import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Round } from "@/type/Round";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

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
        <Button variant="outline">Edit</Button>
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

          <Label htmlFor="name">Categories</Label>
          <div className="flex flex-col gap-2">
            {round.categories.length === 0 && <div>No categories</div>}
            <Accordion type="single" collapsible>
              {round.categories.map((category) => (
                <AccordionItem value={category.id}>
                  <AccordionTrigger>{category.name}</AccordionTrigger>
                  <AccordionContent>
                    <AccordionItem value={category.id}>
                      {category.questions.map((question, index) => (
                        <>
                          {index > 0 && <Separator />}
                          <div className="flex justify-between items-center m-1">
                            <div>{question.question}</div>
                            <div className="text-xs font-thin">
                              {question.value}
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
