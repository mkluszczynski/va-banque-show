import { Round } from "@/round/Round";
import { Team } from "@/team/Team";
import { Question } from "../category/types/Question";
import { Player } from "../player/Player";

export type Game = {
  id: string;
  admin: Player | null;
  teams: Team[];
  rounds: Round[];
  players: Player[];
  currentRound: Round | null;
  currentQuestion: Question | null;
  answeringPlayer: Player | null;
};
