import { Router } from "express";
import { getGames, postGames } from "../controllers/gamesController.js";
import { gameValidation } from "../middlewares/gamesMiddleware.js";

const router = Router()

router.get('/games', getGames)
router.post('/games', gameValidation, postGames)

export default router