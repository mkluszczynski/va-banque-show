import { PlayerProvider } from "@/player/PlayerContext";
import { CategoriesWidgetView } from "./CategoriesWidgetView";

export function CategoriesWidget() {
  return (
    <PlayerProvider>
      <CategoriesWidgetView />
    </PlayerProvider>
  );
}
