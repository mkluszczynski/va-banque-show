import { Player } from "@/player/Player";

export type Team = {
    id: string;
    name: string;
    capitan: Player | null;
    players: Player[];
    score: number;
}