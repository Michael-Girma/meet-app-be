const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

const bindUserDataToReq = (userData, req) => {
    req.userData = userData;
    return userData
}

const getUserDataFromReq = (req) => {
    return req.userData
}

const getTokenFromRequest = (req) => {
    let authHeader = req.headers["authorization"]
    let token = authHeader && authHeader.split(" ")[1]
    return token;
}

const parseTokenDetails = (token) => {
    try{
        var decoded = jwt.verify(token, authConfig.authSecret)
        return decoded;
    }catch(e){
        console.log("error: ", e)
        throw e;
    }
}


module.exports = {
    bindUserDataToReq,
    getUserDataFromReq,
    getTokenFromRequest,
    parseTokenDetails
}