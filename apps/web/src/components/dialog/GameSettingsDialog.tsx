import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bolt } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TeamSettingsView } from "@/view/settings/TeamSettingsView";
import { RoundSettingsView } from "@/view/settings/RoundSettingsView";

export function GameSettingsDialog() {
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
          <TabsContent value="Rounds">
            <RoundSettingsView />
          </TabsContent>
          <TabsContent value="Categories">
            Change your password here.
          </TabsContent>
        </DialogContent>
      </Tabs>
    </Dialog>
  );
}
