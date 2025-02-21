import { GameService } from "../../src/game/game-service";
import { PlayerService } from "../../src/player/player-service";
import { Team } from "../../src/team/team";
import { TeamService } from "../../src/team/team-service";

describe('TeamService', () => {
    let gameService: GameService;
    let teamService: TeamService;
    let playerService: PlayerService;
    
    beforeEach(() => {
        gameService = new GameService();
        teamService = new TeamService();
        playerService = new PlayerService();
    });
    
    it('should create a team', () => {
        const team = teamService.createTeam('Team 1');
        expect(team.name).toBe('Team 1');
        expect(teamService.teams).toContain(team);
    });

    it('should remove a team', () => {
        const team = teamService.createTeam('Team 1');

        teamService.removeTeam(team);
        expect(teamService.teams).not.toContain(team);
    });

    it('should throw an error when trying to remove a team that does not exist', () => {
        teamService.createTeam('Team 1');
        const team2 = new Team('Team 2');

        expect(() => teamService.removeTeam(team2)).toThrow();
    });

    it('should throw an error when trying to get a team that does not exist', () => {
        teamService.createTeam('Team 1');
        const team2 = new Team('Team 2');

        expect(() => teamService.getTeamById(team2.id)).toThrow();
    });

    it('should add a player to a team', () => {
        const game = gameService.createGame(playerService.registerPlayer({ nickname: 'Admin' }));
        const team = teamService.createTeam('Team 1');
        const player = playerService.registerPlayer({ nickname: 'Player 1' });

        game.addTeam(team);
        teamService.addPlayerToTeam(player, team);

        expect(team.players).toContain(player);
        expect(game.teams[0].players).toContain(player);
    });

    it('player should switch teams', () => {
        const game = gameService.createGame(playerService.registerPlayer({ nickname: 'Admin' }));
        const team = teamService.createTeam('Team 1');
        const team2 = teamService.createTeam('Team 2');
        const player = playerService.registerPlayer({ nickname: 'Player 1' });

        game.addTeam(team);
        game.addTeam(team2);
        teamService.addPlayerToTeam(player, team);

        expect(team.players).toContain(player);
        expect(game.teams[0].players).toContain(player);


        teamService.addPlayerToTeam(player, team2);
        expect(team.players).not.toContain(player);
        expect(team2.players).toContain(player);
        expect(game.teams[0].players).not.toContain(player);
        expect(game.teams[1].players).toContain(player);
    });

    it('should throw an error when trying to add a player to a team that does not exist', () => {
        teamService.createTeam('Team 1');
        const player = playerService.registerPlayer({ nickname: 'Player 1' });
        const team2 = new Team('Team 2');

        expect(() => teamService.addPlayerToTeam(player, team2)).toThrow();
    });

});
