import { useSocket } from "@/common/socket/useSocket";
import { Game } from "@/game/Game";
import { usePlayer } from "@/player/PlayerContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function CategoryWidgetView() {
  const params = useParams();
  const { player } = usePlayer();
  const socket = useSocket();
  const gameId = params.id;
  const [game, setGame] = useState<Game | null>(null);

  socket.on("update", ({ game }: { game: Game }) => {
    console.log("game", game);
    setGame(game);
  });

  useEffect(() => {
    socket.emit(
      "game:widget:join",
      { gameId, playerId: player?.id },
      ({ game }: { game: Game }) => {
        console.log("game", game);

        setGame(game);
      }
    );
  }, []);

  return (
    <div className="flex justify-center items-center gap-4 border-[#df2af0] h-screen text-4xl p-4 rounded-2xl border-8 bg-[#902394] text-[#f7f7f7]">
      {game?.currentRound?.categories.map((category) => (
        <div key={category.id} className="flex flex-col gap-4">
          <h2>{category.name}</h2>
          <div className="flex flex-col items-center gap-2">
            {category.questions.map((question) => (
              <div key={question.id}>
                {question.isAnswered ? (
                  <span className="line-through">{question.value}</span>
                ) : (
                  <span>{question.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
