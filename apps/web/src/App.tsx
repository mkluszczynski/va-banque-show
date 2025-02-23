import { PlayerRegister } from "./view/PlayerRegisterView";
import { SocketContext } from "./context/SocketContext";
import { io } from "socket.io-client";
import { PlayerContext } from "./context/PlayerContext";
import { Player } from "./type/Player";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { MainMenu } from "./view/MainMenuView";
import { useState } from "react";

export default function App() {
  const [savedPlayer] = useLocalStorage("player", null);
  const [player, setPlayer] = useState<Player | null>(savedPlayer);

  return (
    <SocketContext.Provider value={io("http://localhost:3000")}>
      <PlayerContext.Provider value={{ player, setPlayer }}>
        <div className="flex justify-center items-center h-screen w-screen">
          {player ? <MainMenu /> : <PlayerRegister />}
        </div>
      </PlayerContext.Provider>
    </SocketContext.Provider>
  );
}
