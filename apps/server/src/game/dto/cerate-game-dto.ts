import { TeamDto } from "../../team/dto/team-dto";
import { QuestionValue } from "../../types/question-value";

type QuestionDto = {
  question: string;
  answer: string;
  value: QuestionValue;
};

type CategoryDto = {
  name: string;
  questions: QuestionDto[];
};

type RoundDto = {
  multiplier: number;
  categories: CategoryDto[];
};

export type CreateGameDto = {
  teams: TeamDto[];
  rounds: RoundDto[];
};
