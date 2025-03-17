import { CategoryListProvider } from "@/category/CategoryListContext";
import { CategorySettingsView } from "@/category/CategorySettingsView";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoundSettingsView } from "@/round/RoundSettingsView";
import { TeamSettingsView } from "@/team/TeamSettingsView";
import { Bolt } from "lucide-react";

export function GameSettingsDialog() {
  return (
    <CategoryListProvider>
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
              <CategorySettingsView />
            </TabsContent>
          </DialogContent>
        </Tabs>
      </Dialog>
    </CategoryListProvider>
  );
}
