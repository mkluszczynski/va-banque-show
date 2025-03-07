import { CopyGameCode } from "@/game/CopyGameCode";
import { useGame } from "@/game/GameContext";
import { useTeamCommands } from "@/team/useTeamCommands";
import { ErrorView } from "../common/utils/ErrorView";
import { TeamView } from "../team/TeamView";

export function PlayerLobbyView() {
  const gameContext = useGame();
  const { joinTeam } = useTeamCommands();

  if (!gameContext.game) return <ErrorView />;

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>{gameContext.game.admin?.nickname}'s Game</h1>
      <h4>Waiting for host to start.</h4>
      <CopyGameCode gameCode={gameContext.game.id} />
      <div className="flex justify-center gap-4">
        {gameContext.game.teams.map((team) => (
          <TeamView key={team.id} team={team} onJoin={joinTeam} />
        ))}
      </div>
    </div>
  );
}
