import { GameContext } from "@/context/GameContext";
import { useContext } from "react";
import { ErrorView } from "../ErrorView";
import { useTeamCommands } from "@/hooks/commands/useTeamCommands";
import { Button } from "@/components/ui/button";

export function PlayerLobbyView() {
  const gameContext = useContext(GameContext);
  const { joinTeam } = useTeamCommands();

  if (!gameContext.game) return <ErrorView />;

  return (
    <div>
      <h1>Player Lobby</h1>
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
            <Button onClick={() => joinTeam(team.id)}>Join</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
