const Joi = require("joi")

const loginSchema = Joi.object().keys({
    login: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(4).max(20).required()
})

module.exports = loginSchema