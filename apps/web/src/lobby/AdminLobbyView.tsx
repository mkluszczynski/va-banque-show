import { CopyGameCode } from "@/game/CopyGameCode";
import { useGame } from "@/game/GameContext";
import { GameSettingsDialog } from "@/game/GameSettingsDialog";
import { ErrorView } from "../common/utils/ErrorView";
import { TeamView } from "../team/TeamView";

export function AdminLobbyView() {
  const gameContext = useGame();

  if (!gameContext.game) return <ErrorView />;

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>{gameContext.game.admin?.nickname}'s Game (Admin panel)</h1>
      <h4>Waiting for host to start.</h4>
      <div className="flex gap-4">
        <CopyGameCode gameCode={gameContext.game.id} />
        <GameSettingsDialog />
      </div>
      <div className="flex justify-center gap-4">
        {gameContext.game.teams.map((team) => (
          <TeamView key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
