import { GameContext } from "@/context/GameContext";
import { MainMenu } from "./MainMenuView";
import { useContext } from "react";

export function LobbyView() {
  const gameContext = useContext(GameContext);

  if (!gameContext?.game) return <MainMenu />;

  return (
    <div>
      <h1>Lobby</h1>
      <p>Game ID: {gameContext.game.id}</p>
    </div>
  );
}
