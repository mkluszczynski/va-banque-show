import { useSocket } from "@/common/socket/useSocket";
import { Game } from "@/game/Game";
import { Team } from "@/team/Team";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function TeamWidget() {
  const params = useParams();
  const socket = useSocket();

  const gameId = params.gameId;
  const teamId = params.teamId;

  const [game, setGame] = useState<Game | null>(null);
  const [team, setTeam] = useState<Team | null>(null);

  socket.on("update", ({ game }: { game: Game }) => {
    setGame(game);
  });

  useEffect(() => {
    socket.emit("game:widget:join", { gameId }, ({ game }: { game: Game }) => {
      setGame(game);
    });
  }, [gameId, socket]);

  useEffect(() => {
    if (!game) return;

    const team = game.teams.find((team) => team.id === teamId);
    setTeam(team || null);
  }, [game, teamId]);

  return (
    <div className="flex justify-center items-center gap-4 border-[#df2af0] h-screen text-4xl p-4 rounded-2xl border-8 bg-[#902394] text-[#f7f7f7]">
      <div className="flex flex-col gap-4">
        <h2>{team?.name}</h2>
        <div className="flex flex-col items-center gap-2">{team?.score}</div>
      </div>
    </div>
  );
}
