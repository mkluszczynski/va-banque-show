import { Round } from "@/round/Round";
import { Team } from "@/team/Team";
import { Question } from "../category/types/Question";
import { Player } from "../player/Player";
import { FinalRound } from "@/final-round/FinalRound";

export type Game = {
  id: string;
  admin: Player | null;
  teams: Team[];
  rounds: Round[];
  finalRound: FinalRound | null;
  players: Player[];
  currentRound: Round | null;
  currentQuestion: Question | null;
  answeringPlayer: Player | null;
};
