import { Player } from "@/player/Player";

export type Team = {
    id: string;
    name: string;
    players: Player[];
    score: number;
}