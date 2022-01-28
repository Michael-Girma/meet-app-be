const authConfig = require("../config/auth")
const User = require("../models").User;
const BlacklistedToken = require("../models").BlacklistedToken;
var bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken")
var requestService = require("../services/requestServices")

const signup = async(req, res, next) => {
    var {
        email,
        firstName,
        lastName,
        email,
        organization,
        password
    } = req.body;
    var lowerCaseEmail = email.toLowerCase();
    var user = await User.findOne({ where: { email:lowerCaseEmail }})

    if(user){
        return res.status(403).send({
            status: "Email is registered to an existing account"
        })
    }

    var salt = await bcrypt.genSalt(authConfig.saltRounds)
    var hash = await bcrypt.hash(password, salt)

    return User.create({
        email: lowerCaseEmail,
        password: hash,
        firstName,
        lastName,
        organization,
    })
    .then(newUser => res.status(200).send({
        status: "Signed up successfully"
    }))
    .catch(error => {
        console.log(error)
        res.status(401).send({
            status: "Error creating account"
        })
    })
}

const login = async(req, res, next) => {
    console.log(authConfig)
    var { email, password } = req.body;
    var user = await User.findOne({ where: { email: email.toLowerCase() }})
  
    if(user == null){
        return res.status(403).send({
            status: "Account does not exist"
        })
    }

    if(!(await bcrypt.compare(password, user.password))){
        return res.status(401).send({
            status: "Incorrect Credentials"
        })
    }

    var token = jwt.sign({userId: user.id}, authConfig.authSecret, {
        expiresIn: authConfig.accessTokenDuration
    });
    
    res.status(200).send({
        status: "Logged In",
        token,
        expiresIn: authConfig.accessTokenDuration,
        user: {...user.dataValues, password: undefined}
    })

}

const logout = async(req, res, next) => {
    let token = requestService.getTokenFromRequest(req)
    return BlacklistedToken.create({token})
    .then(success => res.status(204).send())
    .catch(error => req.status(403).send())
}

module.exports = {
    signup,
    login,
    logout
}
