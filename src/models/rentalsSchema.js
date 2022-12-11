import joi from "joi"

export const rentalsSchema = joi.object({
    customerId: joi.number().integer().required().greater(0),
    gameId: joi.number().integer().required().greater(0),
    daysRented: joi.number().integer().required().greater(0)
})