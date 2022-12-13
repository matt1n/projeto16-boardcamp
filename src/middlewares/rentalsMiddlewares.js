import dayjs from "dayjs"
import { connection } from "../database/database.js"
import { rentalsSchema } from "../models/rentalsSchema.js"

export async function rentalValidation(req,res,next){
    const {customerId, gameId, daysRented} = req.body

    const {error} = rentalsSchema.validate({customerId, gameId, daysRented})
    if (error){
        return res.sendStatus(400)
    }

    const thisCustomerIsRegistered = await connection.query(`
        SELECT *
        FROM customers
        WHERE id = ($1)
    `, [customerId])

    if (thisCustomerIsRegistered.rows.length===0){
        return res.sendStatus(400)
    }

    const game = await connection.query(`
        SELECT *
        FROM games
        WHERE id = ($1)
    `, [gameId])

    if (game.rows.length===0){
        return res.sendStatus(400)
    }

    const thisGameOpenRentals = await connection.query(`
        SELECT *
        FROM rentals
        WHERE "gameId" = ($1) AND "returnDate" IS NULL
    `, [gameId])

    if (thisGameOpenRentals.rows.length === game.rows[0].stockTotal){
        return res.sendStatus(400)
    }

    req.game = game

    next()
}

export async function closeRentalValidation(req,res,next){
    const id = req.params.id;
    const date = dayjs().format('YYYY-MM-DD')

    const rental = await connection.query(`
        SELECT *
        FROM rentals
        WHERE id = ($1)
    `, [id])
    if (rental.rows.length===0){
        return res.sendStatus(404)
    }
    if (rental.rows[0].returnDate!==null){
        return res.sendStatus(400)
    }

    const rentDate = rental.rows[0].rentDate
    const daysDiff = dayjs(date).diff(dayjs(rentDate),'d')

    const game = await connection.query(`
        SELECT *
        FROM games
        WHERE id = ($1)
    `, [rental.rows[0].gameId])

    req.fee = daysDiff>rental.rows[0].daysRented && (daysDiff-rental.rows[0].daysRented)*game.rows[0].pricePerDay

    next()
}

export async function deleteRentalValidation(req,res,next){
    const id = req.params.id

    const rental = await connection.query(`
        SELECT *
        FROM rentals
        WHERE id = ($1)
    `,[id])
    if(rental.rows.length===0){
        return res.sendStatus(404)
    }
    if(!rental.rows[0].returnDate){
        return res.sendStatus(400)
    }

    next()
}