const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const sign = (payload) => {
    return jwt.sign(payload, process.env.SECRET_KEY)
}

const verify = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = {
    sign,
    verify
}