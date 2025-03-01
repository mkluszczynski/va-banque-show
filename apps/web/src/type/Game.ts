import { Player } from "./Player";
import { Question } from "./Question";
import { Round } from "./Round";
import { Team } from "./Team";

export type Game = {
    id: string;
    admin: Player | null;
    teams: Team[];
    rounds: Round[];
    players: Player[];
    currentRound: Round | null;
    currentQuestion: Question | null;
    answeringPlayer: Player | null;
}