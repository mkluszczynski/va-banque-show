import { genId } from "../../utils/gen-id";
import { Round } from "./round";

export class RoundService {
  // public rounds: Round[] = [];

  public createRound(multiplier: number): Round {
    const id = genId();
    const round = new Round(id, multiplier);
    // this.rounds.push(round);
    return round;
  }

  // public getRoundById(id: string): Round | null {
  //   const round = this.rounds.find((round) => round.id === id);
  //   return round || null;
  // }

  // public getRounds(): Round[] {
  //   return this.rounds;
  // }

  // public deleteRound(id: string): void {
  //   this.rounds = this.rounds.filter((round) => round.id !== id);
  // }
}
