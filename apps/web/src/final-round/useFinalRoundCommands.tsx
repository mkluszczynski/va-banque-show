import { usePlayer } from "@/player/PlayerContext";
import { FinalRoundAnswer } from "./FinalRound";
import { useGame } from "@/game/GameContext";
import { useTeamCommands } from "@/team/useTeamCommands";

export function useFinalRoundCommands() {
  const { game } = useGame();
  const { player } = usePlayer();
  const { getPlayerTeam } = useTeamCommands();

  return {
    getFinalAnswer: () => {
      const team = getPlayerTeam();
      if (!game || !player || !team) return;

      const finalRound = game.finalRound;

      if (!finalRound) return;

      const teamAnswer = finalRound.answers.find(
        (answer: FinalRoundAnswer) => answer.teamId === team.id
      );

      return teamAnswer;
    },
    didPlayerAnswerFinal: () => {
      const team = getPlayerTeam();
      if (!game || !player || !team) return;

      const finalRound = game.finalRound;

      if (!finalRound) return;

      return finalRound.answers.some(
        (answer: FinalRoundAnswer) => answer.teamId === team.id
      );
    },
    getFinalQuestion: () => {
      if (!game) return;
      return game.finalRound?.finalQuestion;
    },
    getTeamAnswer: (teamId: string) => {
      if (!game) return;
      return game.finalRound?.answers.find(
        (answer: FinalRoundAnswer) => answer.teamId === teamId
      );
    },
  };
}
