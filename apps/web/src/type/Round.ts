import { Category } from "./Category";

export type Round = {
    id: string;
    multiplier: number;
    categories: Category[];
}