import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { useSocket } from "@/common/socket/useSocket";
import { Game } from "@/game/Game";
import { useGame } from "@/game/GameContext";
import { getApi } from "@/lib/fetch";
import { usePlayer } from "@/player/PlayerContext";
import { Team } from "@/team/Team";

export function useGameCommands() {
  const socket = useSocket();
  const playerContext = usePlayer();
  const gameContext = useGame();

  const [, setSaveGame, removeSavedGame] = useLocalStorage<Game | null>(
    "game",
    null
  );

  return {
    checkIfGameExists: (gameId: string) => {
      socket.emit("game:exists", { gameId }, (doseGameExists: boolean) => {
        if (!doseGameExists) {
          gameContext?.setGame(null);
          removeSavedGame();
        }
      });
    },
    createGame: () => {
      if (!playerContext) return;
      if (!gameContext) return;
      socket.emit(
        "game:create",
        { adminId: playerContext.player?.id },
        ({ game }: { game: Game }) => {
          gameContext.setGame(game);
          setSaveGame(game);
        }
      );
    },
    joinGame: (gameId: string) => {
      if (!playerContext.player) return;
      socket.emit(
        "game:join",
        { gameId, playerId: playerContext.player.id },
        ({ game }: { game: Game }) => {
          gameContext.setGame(game);
          setSaveGame(game);
        }
      );
    },
    rejoin: () => {
      if (!playerContext.player) return;
      if (!gameContext.game) return;

      socket.emit("game:rejoin", {
        gameId: gameContext.game.id,
        playerId: playerContext.player?.id,
      });
    },
    leaveGame: () => {
      if (!playerContext) return;
      if (!gameContext) return;
      socket.emit("game:leave", {
        gameId: gameContext.game?.id,
        playerId: playerContext.player?.id,
      });
      gameContext.setGame(null);
      removeSavedGame();
    },
    selectRound: (roundId: string) => {
      if (!gameContext.game) return;
      socket.emit("game:round:select", {
        gameId: gameContext.game.id,
        roundId,
      });
    },
    selectQuestion: (categoryId: string, questionId: string) => {
      if (!gameContext.game) return;
      socket.emit("game:question:select", {
        gameId: gameContext.game.id,
        roundId: gameContext.game.currentRound?.id,
        categoryId,
        questionId,
      });
    },
    canGameStart: async () => {
      if (!gameContext.game) return false;
      const canStart = await getApi(`/games/${gameContext.game.id}/can-start`);
      return canStart;
    },
    startGame: () => {
      if (!gameContext.game) return;
      socket.emit("game:start", gameContext.game.id);
    },
    dispatchAnswer: () => {
      if (!gameContext.game) return;
      if (!playerContext.player) return;

      socket.emit("game:answer:dispatch", {
        gameId: gameContext.game.id,
        playerId: playerContext.player.id,
      });
    },
    selectPlayerToAnswer: (playerId: string) => {
      if (!gameContext.game) return;
      socket.emit("game:answer:dispatch", {
        gameId: gameContext.game.id,
        playerId,
      });
    },
    validateAnswer: (isValid: boolean) => {
      if (!gameContext.game) return;
      socket.emit("game:answer:validate", {
        gameId: gameContext.game.id,
        isValid,
      });
    },
    validateFinalAnswer: (teamId: string, isValid: boolean) => {
      if (!gameContext.game) return;
      socket.emit("game:answer:final:validate", {
        gameId: gameContext.game.id,
        teamId,
        isValid,
      });
    },
    skipQuestion: () => {
      if (!gameContext.game) return;
      socket.emit("game:question:skip", gameContext.game.id);
    },
    nextRound: () => {
      if (!gameContext.game) return;
      socket.emit("game:round:next", gameContext.game.id);
    },
    hasMoreRounds: async () => {
      if (!gameContext.game) return false;
      const hasMoreRounds = await getApi(
        `/games/${gameContext.game.id}/has-more-rounds`
      );
      return hasMoreRounds;
    },
    isFinalRoundOver: () => {
      if (!gameContext.game) return false;

      const isFinalRoundOver =
        gameContext.game.finalRound?.finalQuestion.isAnswered;

      return isFinalRoundOver;
    },
    setFinalRoundLive: () => {
      if (!gameContext.game) return;
      socket.emit("game:round:final", { gameId: gameContext.game.id });
    },
    isFinalRoundLive: () => {
      if (!gameContext.game) return false;
      return gameContext.game.finalRound?.isLive;
    },
    getWinningTeam: async () => {
      if (!gameContext.game) return;
      const winningTeam: Team = await getApi(
        `/games/${gameContext.game.id}/winner`
      );
      return winningTeam;
    },
    finishGame: () => {
      if (!gameContext.game) return;
      socket.emit("game:winner", gameContext.game.id);
      socket.emit("game:finish", gameContext.game.id);
    },
    setQuestionAsBonus: (roundId: string, questionId: string) => {
      const gameId = gameContext.game?.id;
      if (!gameId) return;
      socket.emit("round:question:bonus", {
        gameId,
        roundId,
        questionId,
      });
    },
    setQuestionBonusScore: (questionId: string, bonusScore: number) => {
      const gameId = gameContext.game?.id;
      if (!gameId) return;
      socket.emit("round:question:bonus", {
        gameId,
        questionId,
        bonusScore,
      });
    },
    submitFinalAnswer: (teamId: string, answer: string, value: number) => {
      if (!gameContext.game) return;
      socket.emit("final:round:answer", {
        gameId: gameContext.game.id,
        teamId,
        answer,
        value,
      });
    },
  };
}
