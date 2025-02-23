import { CategoryRepository } from "../../src/category/category-repository";
import { CategoryService } from "../../src/category/category-service";
import { GameService } from "../../src/game/game-service";
import { PlayerService } from "../../src/player/player-service";
import { Question } from "../../src/question/question";
import { RoundService } from "../../src/round/round-service";
import { TeamService } from "../../src/team/team-service";

describe("Game", () => {
  let categoryRepository: CategoryRepository;

  let gameService: GameService;
  let teamService: TeamService;
  let playerService: PlayerService;
  let categoryService: CategoryService;
  let roundService: RoundService;

  beforeEach(() => {
    categoryRepository = new CategoryRepository("./categories.json");

    gameService = new GameService();
    teamService = new TeamService();
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

      game.setAnsweringPlayer(player);
      expect(game.answeringPlayer).toBe(player);
    });

    it("should throw error if player is not in game", () => {
      const admin = playerService.registerPlayer({ nickname: "Admin" });
      const game = gameService.createGame(admin);
      const player = playerService.registerPlayer({ nickname: "Player" });

      expect(() => game.setAnsweringPlayer(player)).toThrow();
    });

    it("should throw error if player is already answaring", () => {
      const admin = playerService.registerPlayer({ nickname: "Admin" });
      const game = gameService.createGame(admin);
      const player = playerService.registerPlayer({ nickname: "Player" });
      const player2 = playerService.registerPlayer({ nickname: "Player2" });

      game.addPlayer(player);

      game.setAnsweringPlayer(player);

      expect(() => game.setAnsweringPlayer(player2)).toThrow();
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

      expect(() =>
        game.setCurrentQuestion(round.categories[0].questions[0])
      ).toThrow();
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

    it("should throw error if question is already answared", () => {
      const admin = playerService.registerPlayer({ nickname: "Admin" });
      const game = gameService.createGame(admin);
      const player = playerService.registerPlayer({ nickname: "Player" });
      const team = teamService.createTeam("Team");
      const round = roundService.createRound(1);

      game.addTeam(team);
      game.addPlayer(player);
      team.addPlayer(player);
      game.addRound(round);
      game.setCurrentRound(round);

      game.setCurrentQuestion(round.categories[0].questions[0]);

      game.setAnsweringPlayer(player);

      game.validateAnswer(true);

      expect(() =>
        game.setCurrentQuestion(round.categories[0].questions[0])
      ).toThrow();
    });
  });

  describe("Player answer", () => {
    it("should set answaring player", () => {
      const admin = playerService.registerPlayer({ nickname: "Admin" });
      const game = gameService.createGame(admin);
      const player = playerService.registerPlayer({ nickname: "Player" });

      game.addPlayer(player);

      game.setAnsweringPlayer(player);
      expect(game.answeringPlayer).toBe(player);
    });

    it("should throw error if player is not in game", () => {
      const admin = playerService.registerPlayer({ nickname: "Admin" });
      const game = gameService.createGame(admin);
      const player = playerService.registerPlayer({ nickname: "Player" });

      expect(() => game.setAnsweringPlayer(player)).toThrow();
    });

    it("should throw error if player is already answaring", () => {
      const admin = playerService.registerPlayer({ nickname: "Admin" });
      const game = gameService.createGame(admin);
      const player = playerService.registerPlayer({ nickname: "Player" });
      const player2 = playerService.registerPlayer({ nickname: "Player2" });

      game.addPlayer(player);

      game.setAnsweringPlayer(player);

      expect(() => game.setAnsweringPlayer(player2)).toThrow();
    });
  });

  describe("Validate answer", () => {
    it("should validate answer", () => {
      const admin = playerService.registerPlayer({ nickname: "Admin" });
      const game = gameService.createGame(admin);
      const player = playerService.registerPlayer({ nickname: "Player" });
      const team = teamService.createTeam("Team");
      const round = roundService.createRound(1);

      game.addRound(round);
      game.setCurrentRound(round);
      game.setCurrentQuestion(round.categories[0].questions[0]);

      game.addTeam(team);
      game.addPlayer(player);
      team.addPlayer(player);

      game.setAnsweringPlayer(player);

      game.validateAnswer(true);
      expect(game.answeringPlayer).toBe(null);
    });

    it("should throw error if no player is answaring", () => {
      const admin = playerService.registerPlayer({ nickname: "Admin" });
      const game = gameService.createGame(admin);

      expect(() => game.validateAnswer(true)).toThrow();
    });

    it("should throw error if answer is not selected", () => {
      const admin = playerService.registerPlayer({ nickname: "Admin" });
      const game = gameService.createGame(admin);
      const player = playerService.registerPlayer({ nickname: "Player" });
      const team = teamService.createTeam("Team");
      const round = roundService.createRound(1);

      game.addRound(round);
      game.setCurrentRound(round);

      game.addTeam(team);
      game.addPlayer(player);
      team.addPlayer(player);

      game.setAnsweringPlayer(player);

      expect(() => game.validateAnswer(true)).toThrow();
    });

    it("should mark question as answared", () => {
      const admin = playerService.registerPlayer({ nickname: "Admin" });
      const game = gameService.createGame(admin);
      const player = playerService.registerPlayer({ nickname: "Player" });
      const team = teamService.createTeam("Team");
      const round = roundService.createRound(1);

      game.addRound(round);
      game.setCurrentRound(round);
      console.log(round.categories[0]);

      console.log(round.categories[0].questions[0]);

      game.setCurrentQuestion(round.categories[0].questions[0]);

      game.addTeam(team);
      game.addPlayer(player);
      team.addPlayer(player);

      game.setAnsweringPlayer(player);
      console.log(game.currentQuestion);

      game.validateAnswer(true);

      expect(round.categories[0].questions[0].isAnswered).toBe(true);
    });
  });
});
