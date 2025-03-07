import { io } from "socket.io-client";
import { SocketContext } from "./common/socket/SocketContext";
import { TopBarView } from "./common/top-bar/TopBarView";
import { GameProvider, useGame } from "./game/GameContext";
import { useGameCommands } from "./game/useGameCommands";
import { LobbyView } from "./lobby/LobbyView";
import { MainMenu } from "./menu/MainMenuView";
import { PlayerRegister } from "./menu/PlayerRegisterView";
import { PlayerProvider, usePlayer } from "./player/PlayerContext";
import { usePlayerCommands } from "./player/usePlayerCommands";
import { ThemeProvider } from "./team/ThemeProvider";

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
  const playerContext = usePlayer();
  const gameContext = useGame();

  const { checkIfGameExists, rejoin } = useGameCommands();
  const { checkIfPlayerExists } = usePlayerCommands();

  if (playerContext?.player) checkIfPlayerExists(playerContext.player.id);
  if (gameContext?.game) checkIfGameExists(gameContext.game.id);

  rejoin();

  if (!playerContext?.player) return <PlayerRegister />;
  if (!gameContext?.game) return <MainMenu />;
  return <LobbyView />;
}
