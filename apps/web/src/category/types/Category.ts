import { Question } from "./Question";

export type Category = {
  id: string;
  name: string;
  questions: Question[];
};
