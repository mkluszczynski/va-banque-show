import { genId } from "../../utils/gen-id";
import { CategoryService } from "../category/category-service";
import { RoundService } from "../round/round-service";
import { FinalRound } from "./final-round";

export class FinalRoundService {
    finalRounds: FinalRound[] = [];

    constructor(
        private readonly categoryService: CategoryService,
        private readonly roundService: RoundService
    ) {}

    public createFinalRound(): FinalRound {
        const id = genId();
        const randomQuestion = this.categoryService.getRandomQuestion();
        const finalRound = new FinalRound(id, randomQuestion);

        this.finalRounds.push(finalRound);

        return finalRound;
    }

    public getFinalRoundById(id: string): FinalRound {
        const finalRound = this.finalRounds.find((finalRound) => finalRound.id === id);

        if (!finalRound) {
            throw new Error(`Final round with id ${id} not found`);
        }

        return finalRound;
    }

    public removeFinalRoundById(id: string): void {
        this.finalRounds = this.finalRounds.filter((finalRound) => finalRound.id !== id);
    }
}