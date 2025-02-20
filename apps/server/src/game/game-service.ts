import { Player } from "../player/player";
import { Game } from "./game";

export class GameService {
  private games: Game[] = [];

  createGame(admin: Player): Game {
    const game = new Game(admin);
    this.games.push(game);
    return game;
  }

  getGameById(id: string): Game {
    const game = this.games.find((game) => game.id === id);

    if (!game) {
      throw new Error(`Game with id ${id} not found`);
    }

    return game ;
  }

  getGames() {
    return this.games;
  }

  deleteGame(id: string) {
    this.games = this.games.filter((game) => game.id !== id);
  }

  doseGameExist(id: string) {
    return !!this.games.some((game) => game.id === id);
  }
}
