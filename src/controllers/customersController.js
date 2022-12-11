import { connection } from "../database/database.js"

export async function getCustomers(req,res){
    try {
        const costumers = await connection.query(`
            SELECT
                *
            FROM
                customers
        `)
        res.send(costumers.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getCustomersById(req,res){
    const customer = req.customer
    try {
        res.send(customer)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}