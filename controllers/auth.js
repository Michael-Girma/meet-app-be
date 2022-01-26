const authConfig = require("../config/auth")
const User = require("../models").User;
var bcrypt = require("bcrypt")

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
module.exports = {
    signup
}
