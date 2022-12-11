import { connection } from "../database/database.js";

export async function getCustomerByIdValidation(req,res,next){
    const id = req.params.id

    const thisIdExist = await connection.query(`
        SELECT
            *
        FROM
            customers
        WHERE
            id = ($1)
    `, [id])
    if (thisIdExist.rows.length===0){
        return res.sendStatus(404)
    }

    req.customer = thisIdExist.rows[0]

    next()
}