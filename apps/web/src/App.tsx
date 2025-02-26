import { PlayerRegister } from "./view/PlayerRegisterView";
import { SocketContext } from "./context/SocketContext";
import { io } from "socket.io-client";
import { MainMenu } from "./view/MainMenuView";
import { useContext } from "react";
import { LobbyView } from "./view/lobby/LobbyView";
import { useGameCommands } from "./hooks/commands/useGameCommands";
import { usePlayerCommands } from "./hooks/commands/usePlayerCommands";
import { GameContext } from "./context/GameContext";
import { PlayerContext } from "./context/PlayerContext";
import { PlayerProvider } from "./provider/PlayerProvider";
import { GameProvider } from "./provider/GameProvider";

export default function App() {
  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });

  socket.on("error", (error: unknown) => {
    console.error(error);
  });

  return (
    <SocketContext.Provider value={socket}>
      <PlayerProvider>
        <GameProvider>
          <div className="flex justify-center items-center h-screen w-screen relative">
            <CurrentView />
          </div>
        </GameProvider>
      </PlayerProvider>
    </SocketContext.Provider>
  );
}

function CurrentView() {
  const playerContext = useContext(PlayerContext);
  const gameContext = useContext(GameContext);

  const { checkIfGameExists } = useGameCommands();
  const { checkIfPlayerExists } = usePlayerCommands();

  if (playerContext?.player) checkIfPlayerExists(playerContext.player.id);
  if (gameContext?.game) checkIfGameExists(gameContext.game.id);

  if (!playerContext?.player) return <PlayerRegister />;
  if (!gameContext?.game) return <MainMenu />;
  return <LobbyView />;
}
