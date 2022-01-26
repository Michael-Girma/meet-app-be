var dotenv = require("dotenv").config({
    path: __dirname + '/process.env'
})

console.log(process.env)

module.exports = {
    authSecret: process.env.TOKEN_SECRET,
    accessTokenDuration: 86400,
    saltRounds: 10,
}