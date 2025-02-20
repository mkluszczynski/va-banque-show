import { genId } from "../../utils/gen-id";
import { CategoryService } from "../category/category-service";
import { Round } from "./round";

export class RoundService {
  public rounds: Round[] = [];

  constructor(private readonly categoryService: CategoryService) {}

  public createRound(multiplier: number): Round {
    const id = genId();
    const round = new Round(id, multiplier);

    const categories = this.categoryService.getRandomCategories(3);

    round.setCategories(categories);

    this.rounds.push(round);
    return round;
  }

  public getRoundById(id: string): Round {
    const round = this.rounds.find((round) => round.id === id);

    if (!round) {
      throw new Error(`Round with id ${id} not found`);
    }

    return round;
  }

  public getRounds(): Round[] {
    return this.rounds;
  }

  public deleteRound(round: Round): void {
    this.rounds = this.rounds.filter((r) => r.id !== round.id);
  }
}
