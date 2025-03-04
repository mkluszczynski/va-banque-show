import { GameContext } from "@/context/GameContext";
import { useContext } from "react";
import { ErrorView } from "../ErrorView";
import { TeamView } from "../TeamView";

export function AdminLobbyView() {
  const gameContext = useContext(GameContext);

  if (!gameContext.game) return <ErrorView />;

  return (
    <div>
      <h1>Admin Lobby</h1>
      <p>Game ID: {gameContext.game.id}</p>
      <div className="flex justify-center gap-4">
        {gameContext.game.teams.map((team) => (
          <TeamView key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
