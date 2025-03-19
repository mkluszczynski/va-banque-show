import { PlayerProvider } from "@/player/PlayerContext";
import { CategoryWidgetView } from "./CategoryWidgetView";

export function CategoryWidget() {
  return (
    <PlayerProvider>
      <CategoryWidgetView />
    </PlayerProvider>
  );
}
