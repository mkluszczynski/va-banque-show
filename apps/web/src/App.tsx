import { io } from "socket.io-client";
import { SocketContext } from "./common/socket/SocketContext";
import { ThemeProvider } from "./common/theme/ThemeProvider";
import { TopBarView } from "./common/top-bar/TopBarView";
import { GameProvider, useGame } from "./game/GameContext";
import { useGameCommands } from "./game/useGameCommands";
import { LobbyView } from "./lobby/LobbyView";
import { MainMenu } from "./menu/MainMenuView";
import { PlayerRegister } from "./menu/PlayerRegisterView";
import { PlayerProvider, usePlayer } from "./player/PlayerContext";
import { usePlayerCommands } from "./player/usePlayerCommands";
import { GameView } from "./game/views/GameView";
import { useWinner, WinnerProvider } from "./game/WinnerContext";
import { WinnerView } from "./game/views/WinnerView";
import { FinalRoundView } from "./final-round/FinalRoundView";

export default function App() {
  const apiUrl = "https://va-banque-api.mkluszczynski.dev";
  // const apiUrl = "http://localhost:3010";

  const socket = io(apiUrl, {
    transports: ["websocket"],
  });

  // socket.on("error", (error: unknown) => {
  //   console.error(error);
  // });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SocketContext.Provider value={socket}>
        <PlayerProvider>
          <GameProvider>
            <WinnerProvider>
              <div className="flex justify-center items-center h-screen w-screen relative">
                <TopBarView />
                <CurrentView />
              </div>
            </WinnerProvider>
          </GameProvider>
        </PlayerProvider>
      </SocketContext.Provider>
    </ThemeProvider>
  );
}

function CurrentView() {
  const playerContext = usePlayer();
  const gameContext = useGame();
  const { winner } = useWinner();

  const { checkIfGameExists, rejoin } = useGameCommands();
  const { checkIfPlayerExists } = usePlayerCommands();

  if (playerContext?.player) checkIfPlayerExists(playerContext.player.id);
  if (gameContext?.game) checkIfGameExists(gameContext.game.id);

  rejoin();

  if (winner) return <WinnerView />;
  if (!playerContext?.player) return <PlayerRegister />;
  if (!gameContext?.game) return <MainMenu />;
  if (!gameContext.game.currentRound) return <LobbyView />;
  if (gameContext.game.finalRound?.isLive) return <FinalRoundView />;

  return <GameView />;
}
