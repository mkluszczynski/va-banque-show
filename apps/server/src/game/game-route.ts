import { Request, Response, Router } from "express";
import { GameService } from "./game-service";


export const createGameRouter = (gameService: GameService) => {
    const router = Router();

    router.get("/:id/can-start", canGameStart);
    function canGameStart(req: Request, res: Response){ 
        const gameId = req.params.id;
        const game = gameService.getGameById(gameId);

        res.send(game.canGameStart());

    }

    router.get("/:id/has-more-rounds", nextRound);
    function nextRound(req: Request, res: Response){ 
        const gameId = req.params.id;
        const game = gameService.getGameById(gameId);

        res.send(game.hasMoreRounds());
    }

    router.get("/:id/winner", getWinningTeam);
    function getWinningTeam(req: Request, res: Response){
        const gameId = req.params.id;
        const game = gameService.getGameById(gameId);

        res.send(game.getWinningTeam());
    }


    return router;
}
