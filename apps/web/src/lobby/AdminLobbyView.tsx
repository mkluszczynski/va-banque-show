import { CopyButton } from "@/game/buttons/CopyGameCode";
import { StartGameButton } from "@/game/buttons/StartGameButton";
import { GameSettingsDialog } from "@/game/dialogs/GameSettingsDialog";
import { useGame } from "@/game/GameContext";
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
        <StartGameButton />
        <CopyButton
          copyContent={gameContext.game.id}
          copyText={gameContext.game.id}
        />
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
