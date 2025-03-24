import { useState } from "react";
import { useCategoryList } from "@/category/CategoryListContext";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRoundCommands } from "../useRoundCommands";

export function FinalRoundEditDialog() {
  const [open, setOpen] = useState(false);
  const { categories } = useCategoryList();
  const { setFinalRoundQuestion } = useRoundCommands();

  const handleFinalQuestionSelect = (questionId: string) => {
    setFinalRoundQuestion(questionId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0">
          <Edit size={12} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Select final question</DialogTitle>
        <Command>
          <CommandInput placeholder="Search question..." />
          <ScrollArea className="h-[70vh]">
            <CommandList className="overflow-hidden h-full max-h-none">
              <CommandEmpty>No results found.</CommandEmpty>
              {categories.map((category, index) => (
                <>
                  {index !== 0 && <CommandSeparator />}
                  <CommandGroup key={category.id} heading={category.name}>
                    {category.questions.map((question) => (
                      <CommandItem key={question.id}>
                        <div
                          onClick={() => handleFinalQuestionSelect(question.id)}
                          className="cursor-pointer w-full"
                        >
                          {question.question}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              ))}
            </CommandList>
          </ScrollArea>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
