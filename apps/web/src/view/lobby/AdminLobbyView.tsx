import { GameContext } from "@/context/GameContext";
import { useContext } from "react";
import { ErrorView } from "../ErrorView";

export function AdminLobbyView() {
  const gameContext = useContext(GameContext);

  if (!gameContext.game) return <ErrorView />;

  return (
    <div>
      <h1>Admin Lobby</h1>
      <p>Game ID: {gameContext.game.id}</p>
      <div className="flex justify-center items-stretch">
        {gameContext.game.teams.map((team) => (
          <div
            key={team.id}
            className="flex flex-col justify-center items-center"
          >
            <h2>{team.name}</h2>
            <ul>
              {team.players.map((player) => (
                <li key={player.id}>{player.nickname}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
