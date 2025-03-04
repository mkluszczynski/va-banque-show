import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bolt } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TeamSettingsView } from "@/view/TeamSettingsView";

export function GameSettingsDialog() {
  const onSave = () => {
    //
  };

  return (
    <Dialog>
      <Tabs defaultValue="account">
        <DialogTrigger asChild>
          <Button variant="outline">
            <Bolt />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col justify-center min-w-[70vw] min-h-[90vh] ">
          <DialogHeader className="">
            <DialogTitle>Game settings</DialogTitle>
          </DialogHeader>
          <TabsList className="w-full flex gap-4">
            <TabsTrigger value="Teams">Teams</TabsTrigger>
            <TabsTrigger value="Rounds">Rounds</TabsTrigger>
            <TabsTrigger value="Categories">Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="Teams">
            <TeamSettingsView />
          </TabsContent>
          <TabsContent value="Rounds">Change your password here.</TabsContent>
          <TabsContent value="Categories">
            Change your password here.
          </TabsContent>
          <DialogFooter>
            <Button type="submit" onClick={onSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Tabs>
    </Dialog>
  );
}
