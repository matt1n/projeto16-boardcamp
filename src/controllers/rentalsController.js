import dayjs from "dayjs";
import { connection } from "../database/database.js";

export async function getRentals(req,res){
    const {customerId, gameId} = req.query
    try {
        if(customerId){
            const rentals = await connection.query(`
          SELECT
            rentals.*,
            (
                SELECT
                row_to_json(c)
                FROM
                (
                    SELECT
                    customers.id,
                    customers.name
                    FROM
                    customers
                    WHERE
                    customers.id = rentals."customerId"
                ) c
            ) AS customer,
            (
                SELECT
                row_to_json(g)
                FROM
                (
                    select
                    games.id,
                    games.name,
                    games."categoryId",
                    categories.name
                    FROM
                    games
                    JOIN categories ON games."categoryId" = categories.id
                    WHERE
                    games.id = rentals."gameId"
                ) g
            ) AS game
          FROM
          rentals
          WHERE
          rentals."customerId" = ($1)
        `, [customerId])
        res.send(rentals.rows)
        } else if(gameId){
            const rentals = await connection.query(`
            SELECT
              rentals.*,
              (
                  SELECT
                  row_to_json(c)
                  FROM
                  (
                      SELECT
                      customers.id,
                      customers.name
                      FROM
                      customers
                      WHERE
                      customers.id = rentals."customerId"
                  ) c
              ) AS customer,
              (
                  SELECT
                  row_to_json(g)
                  FROM
                  (
                      select
                      games.id,
                      games.name,
                      games."categoryId",
                      categories.name
                      FROM
                      games
                      JOIN categories ON games."categoryId" = categories.id
                      WHERE
                      games.id = rentals."gameId"
                  ) g
              ) AS game
            FROM
            rentals
            WHERE
            rentals."gameId" = ($1)
          `, [gameId]) 
          res.send(rentals.rows)
        }else{
            const rentals = await connection.query(`
          SELECT
            rentals.*,
            (
                SELECT
                row_to_json(c)
                FROM
                (
                    SELECT
                    customers.id,
                    customers.name
                    FROM
                    customers
                    WHERE
                    customers.id = rentals."customerId"
                ) c
            ) AS customer,
            (
                SELECT
                row_to_json(g)
                FROM
                (
                    select
                    games.id,
                    games.name,
                    games."categoryId",
                    categories.name
                    FROM
                    games
                    JOIN categories ON games."categoryId" = categories.id
                    WHERE
                    games.id = rentals."gameId"
                ) g
            ) AS game
          FROM
          rentals
        `)
        res.send(rentals.rows)
        }
    } catch (err) {
       console.log(err)
       res.sendStatus(500) 
    }
}

export async function postRental(req,res){
    const {customerId, gameId, daysRented} = req.body
    const date = dayjs().format('YYYY-MM-DD')
    const game = req.game
    try {

        const price = game.rows[0].pricePerDay*daysRented
        
        await connection.query(`
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice")
            VALUES ($1, $2, $3, $4, $5)
        `,[customerId, gameId, date, daysRented, price])

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function closeRental(req,res){
    const id = req.params.id
    const date = dayjs().format('YYYY-MM-DD')
    const fee = req.fee
    try {
        if (fee){
            await connection.query(`
                UPDATE rentals
                SET "returnDate"=($1), "delayFee" = ($2)
                WHERE id = ($3)
            `, [date, fee, id])
        } else {
            await connection.query(`
                UPDATE rentals
                SET "returnDate"=($1)
                WHERE id = ($2)
            `, [date, id])
        }

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function deleteRental(req,res){
    const id = req.params.id
    try {
        await connection.query(`
            DELETE FROM rentals
            WHERE id = ($1)
        `, [id])
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}