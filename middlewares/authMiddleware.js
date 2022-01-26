const requestServices = require("../services/requestServices")
const User = require("../models").User

const verifyToken = async(req, res, next) => {
    let token = requestServices.getTokenFromRequest(req)
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    
    try{
        var decoded = requestServices.parseTokenDetails(token);
        console.log(decoded)
        var users = await User.findAll({
            where: {
               id: decoded.userId
            }
        })
    
        if(users.length){
            var user = users.length && users[0]
            req = requestServices.bindUserDataToReq(user.dataValues, req)
            next();    
        }else{
            res.status(401).send({
                message: "Invalid Token!"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(401).send({
            message: "Unauthorized!"
        });
    }
}

module.exports = {
    verifyToken
}