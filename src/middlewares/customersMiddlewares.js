import { connection } from "../database/database.js";
import { customerSchema } from "../models/customersSchema.js";

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

export async function CustomerBodyValidation(req,res,next){
    const body = req.body

    const{error} = customerSchema.validate(body, {abortEarly: false})
    
    if(error){
        return res.sendStatus(400)
    }

    const thisCpfIsRegistered = await connection.query(`
        SELECT
            *
        FROM
            customers
        WHERE
            cpf = ($1)
    `, [body.cpf])
    
    if (thisCpfIsRegistered.rows.length !== 0){
        return res.sendStatus(409)
    }

    res.locals.body = body

    next()
}

export async function CustomerBodyAndIdValidation(req,res,next){
    const id = req.params.id
    const body = req.body

    const customer = await connection.query(`
    SELECT
    *
    FROM
    customers
    WHERE
    id = ($1)`, [id])


    if(customer.rows.length===0){
        return res.sendStatus(404)
    }

    const{error} = customerSchema.validate(body, {abortEarly: false})
    
    if(error){
        return res.sendStatus(400)
    }

    const thisCpfIsRegistered = await connection.query(`
        SELECT
            *
        FROM
            customers
        WHERE
            cpf = ($1)
    `, [body.cpf])
    
    if (thisCpfIsRegistered.rows.length !== 0){
        return res.sendStatus(409)
    }

    res.locals.body = body
    req.id = id

    next()
}