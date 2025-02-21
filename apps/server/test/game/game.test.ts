import { CategoryRepository } from "../../src/category/category-repository";
import { CategoryService } from "../../src/category/category-service";
import { GameService } from "../../src/game/game-service";
import { PlayerService } from "../../src/player/player-service";
import { Question } from "../../src/question/question";
import { RoundService } from "../../src/round/round-service";

describe("Game", () => {

    let categoryRepository: CategoryRepository;

    let gameService: GameService;
    let playerService: PlayerService;
    let categoryService: CategoryService;
    let roundService: RoundService; 
        
    beforeEach(() => {
        categoryRepository = new CategoryRepository("./categories.json");

        gameService = new GameService();
        playerService = new PlayerService();
        categoryService = new CategoryService(categoryRepository);
        roundService = new RoundService(categoryService);
    });

    describe("Player answer", () => {

        it("should set answaring player", () => {
            const admin = playerService.registerPlayer({ nickname: "Admin" });
            const game = gameService.createGame(admin);
            const player = playerService.registerPlayer({ nickname: "Player" });

            game.addPlayer(player);

            game.setAnswaringPlayer(player);
            expect(game.answaringPlayer).toBe(player);
        });

        it("should throw error if player is not in game", () => {
            const admin = playerService.registerPlayer({ nickname: "Admin" });
            const game = gameService.createGame(admin);
            const player = playerService.registerPlayer({ nickname: "Player" });

            expect(() => game.setAnswaringPlayer(player)).toThrow();
        });

        it("should throw error if player is already answaring", () => {
            const admin = playerService.registerPlayer({ nickname: "Admin" });
            const game = gameService.createGame(admin);
            const player = playerService.registerPlayer({ nickname: "Player" });
            const player2 = playerService.registerPlayer({ nickname: "Player2" });

            game.addPlayer(player);

            game.setAnswaringPlayer(player);

            expect(() => game.setAnswaringPlayer(player2)).toThrow();
        });



    });

    describe("Question select", () => {

        it("should select question", () => {
            const admin = playerService.registerPlayer({ nickname: "Admin" });
            const game = gameService.createGame(admin);
            const round = roundService.createRound(1);
            game.addRound(round);
            game.setCurrentRound(round);

            game.setCurrentQuestion(round.categories[0].questions[0]);
            expect(game.currentQuestion).toBe(round.categories[0].questions[0]);
        });

        it("should throw error if current round is not set", () => {
            const admin = playerService.registerPlayer({ nickname: "Admin" });
            const game = gameService.createGame(admin);

            const round = roundService.createRound(1);

            expect(() => game.setCurrentQuestion(round.categories[0].questions[0])).toThrow();
        });

        it("should throw error if question does not exist in current round", () => {
            const admin = playerService.registerPlayer({ nickname: "Admin" });
            const game = gameService.createGame(admin);

            const round = roundService.createRound(1);
            game.addRound(round);
            game.setCurrentRound(round);

            const question = new Question("1", "Question", "Answer", 1);

            expect(() => game.setCurrentQuestion(question)).toThrow();
        });

    });


});