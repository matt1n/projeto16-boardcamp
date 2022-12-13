import { connection } from "../database/database.js";
import { categorySchema } from "../models/categoriesSchema.js";

export async function categoryValidation(req,res,next){
    const {name} = req.body;

    const {error} = categorySchema.validate(
        {name},
        {abortEarly:false}
    )

    if (error) {
        const errors = error.details.map(detail=> detail.message)
        return res.sendStatus(400)
    }

    const category = await connection.query('SELECT * FROM categories WHERE name = $1;', [name])
    if (category.rows.length!==0){
        return res.sendStatus(409)
    }

    req.categoryName = name

    next()

} 