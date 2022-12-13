import { connection } from "../database/database.js"
import { gameSchema } from "../models/gamesSchema.js"

export async function gameValidation(req,res,next){
    const body = req.body

    const {error} = gameSchema.validate(body, {abortEarly: false})
    
    if(error){
        return res.sendStatus(400)
    }

    const thisCategoryExist = await connection.query(`
        SELECT
            *
        FROM
            games
        WHERE
            "categoryId" = ($1)
    `,[body.categoryId])

    if(thisCategoryExist.rows.length === 0){
        return res.sendStatus(400)
    }

    const thisGameExist = await connection.query(`
        SELECT
            *
        FROM
            games
        WHERE
            name = ($1)
    `,[body.name])
    
    if (thisGameExist.rows.length !== 0){
        return res.sendStatus(409)
    }

    res.locals.body = body

    next()
}