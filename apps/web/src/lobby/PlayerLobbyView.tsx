import { CopyGameCode } from "@/game/buttons/CopyGameCode";
import { useGame } from "@/game/GameContext";
import { useTeamCommands } from "@/team/useTeamCommands";
import { ErrorView } from "../common/utils/ErrorView";
import { TeamView } from "../team/TeamView";
import { Button } from "@/components/ui/button";
import { Team } from "@/team/Team";
import { usePlayer } from "@/player/PlayerContext";
import { JSX } from "react";

export function PlayerLobbyView() {
  const gameContext = useGame();

  if (!gameContext.game) return <ErrorView />;

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>{gameContext.game.admin?.nickname}'s Game</h1>
      <h4>Waiting for host to start.</h4>
      <CopyGameCode gameCode={gameContext.game.id} />
      <div className="flex justify-center gap-4">
        {gameContext.game.teams.map((team) => (
          <TeamView key={team.id} team={team}>
            <JoinGameButton team={team} />
          </TeamView>
        ))}
      </div>
    </div>
  );
}

function JoinGameButton({ team }: { team: Team }): JSX.Element | null {
  const { joinTeam } = useTeamCommands();
  const playerContext = usePlayer();
  if (!playerContext.player) return null;

  const isPlayerInTeam = team.players.some(
    (player) => player.id === playerContext.player?.id
  );

  if (isPlayerInTeam) return null;

  return (
    <Button className="w-full" onClick={() => joinTeam(team.id)}>
      Join
    </Button>
  );
}
