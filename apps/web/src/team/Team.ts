import { Player } from "./Player";

export type Team = {
    id: string;
    name: string;
    players: Player[];
    score: number;
}