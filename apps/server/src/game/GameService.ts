import { PlayerService } from "../player/PlayerService";
import { JoinGameDto } from "./dto/join-game.dto";
import { Game } from "./Game";

export class GameService {
  private games: Game[] = [];

  constructor(private readonly playerService: PlayerService) {}

  createGame(id: string) {
    const game = new Game(id);
    this.games.push(game);
    return game;
  }

  getGameById(id: string): Game | null {
    const game = this.games.find((game) => game.id === id);
    return game || null;
  }

  getGames() {
    return this.games;
  }

  deleteGame(id: string) {
    this.games = this.games.filter((game) => game.id !== id);
  }

  joinGame(dto: JoinGameDto): Game {
    const game = this.getGameById(dto.gameId);
    if (!game) {
      throw new Error("Game not found");
    }

    const player = this.playerService.getPlayerById(dto.playerId);
    if (!player) {
      throw new Error("Player not found");
    }

    return game;
  }
}
