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
import { TopBarView } from "./view/TopBarView";
import { ThemeProvider } from "./provider/ThemeProvider";

export default function App() {
  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });

  socket.on("error", (error: unknown) => {
    console.error(error);
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SocketContext.Provider value={socket}>
        <PlayerProvider>
          <GameProvider>
            <div className="flex justify-center items-center h-screen w-screen relative">
              <TopBarView />
              <CurrentView />
            </div>
          </GameProvider>
        </PlayerProvider>
      </SocketContext.Provider>
    </ThemeProvider>
  );
}

function CurrentView() {
  const playerContext = useContext(PlayerContext);
  const gameContext = useContext(GameContext);

  const { checkIfGameExists, rejoin } = useGameCommands();
  const { checkIfPlayerExists } = usePlayerCommands();

  if (playerContext?.player) checkIfPlayerExists(playerContext.player.id);
  if (gameContext?.game) checkIfGameExists(gameContext.game.id);

  rejoin();

  if (!playerContext?.player) return <PlayerRegister />;
  if (!gameContext?.game) return <MainMenu />;
  return <LobbyView />;
}
