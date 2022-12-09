import { connection } from "../database/database.js";


export async function getCategories(req,res){
    try{
        const categories = await connection.query('SELECT * FROM categories')
        res.send(categories.rows)
    }catch (err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function postCategorie(req,res){
    const {name} = req.body
    console.log(name)
    try{
        await connection.query('INSERT INTO categories (name) VALUES ($1)',[name])
        res.send(201)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
} 