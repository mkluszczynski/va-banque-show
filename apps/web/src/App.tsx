import { PlayerRegister } from "./view/PlayerRegisterView";
import { SocketContext } from "./context/SocketContext";
import { io } from "socket.io-client";
import { PlayerContext } from "./context/PlayerContext";
import { Player } from "./type/Player";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { MainMenu } from "./view/MainMenuView";
import { useContext, useState } from "react";
import { Game } from "./type/Game";
import { GameContext } from "./context/GameContext";
import { LobbyView } from "./view/LobbyView";
import { useGameCommands } from "./hooks/commands/useGameCommands";
import { usePlayerCommands } from "./hooks/commands/usePlayerCommands";

export default function App() {
  const [savedPlayer] = useLocalStorage<Player | null>("player", null);
  const [savedGame, setSaveGame] = useLocalStorage<Game | null>("game", null);

  const [player, setPlayer] = useState<Player | null>(savedPlayer);
  const [game, setGame] = useState<Game | null>(savedGame);

  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });

  socket.on("update", ({ game }: { game: Game }) => {
    console.log("update", game);

    setGame(game);
    setSaveGame(game);
  });

  return (
    <SocketContext.Provider value={socket}>
      <PlayerContext.Provider value={{ player, setPlayer }}>
        <GameContext.Provider value={{ game, setGame }}>
          <div className="flex justify-center items-center h-screen w-screen relative">
            <CurrentView />
          </div>
        </GameContext.Provider>
      </PlayerContext.Provider>
    </SocketContext.Provider>
  );
}

function CurrentView() {
  const playerContext = useContext(PlayerContext);
  const gameContext = useContext(GameContext);

  const { checkIfGameExists } = useGameCommands();
  const { checkIfPlayerExists } = usePlayerCommands();
  if (gameContext?.game) checkIfGameExists(gameContext.game.id);
  if (playerContext?.player) checkIfPlayerExists(playerContext.player.id);

  if (!playerContext?.player) return <PlayerRegister />;
  if (!gameContext?.game) return <MainMenu />;
  return <LobbyView />;
}
