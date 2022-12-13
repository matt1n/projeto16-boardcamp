import joi from "joi"

export const customerSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().regex(/^\d+$/).required().min(10).max(11),
    cpf: joi.string().regex(/^\d+$/).required().length(11),
    birthday: joi.string().isoDate().required()
})