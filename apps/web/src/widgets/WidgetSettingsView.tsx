import { Card, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CopyButton } from "@/game/buttons/CopyGameCode";
import { useGame } from "@/game/GameContext";
import { Label } from "@radix-ui/react-label";

export function WidgetSettingsView() {
  const { game } = useGame();
  const url = location.origin;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Label className="text-xl">Widgets</Label>
      </div>
      <ScrollArea className="h-[70vh] ">
        <div className="flex flex-col gap-2">
          <WidgetSettingsListItem
            widget={{
              name: "Category Widget",
              url: url + `/widget/games/${game?.id}/categories`,
            }}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

function WidgetSettingsListItem({
  widget,
}: {
  widget: { name: string; url: string };
}) {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex justify-between items-center w-full">
          <div>{widget.name}</div>
          <div>
            <CopyButton copyContent={widget.url} copyText="Copy Widget URL" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
