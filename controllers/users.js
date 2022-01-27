const User = require("../models").User

const getAllUsers = (req, res, next) => {
    return User.findAll({
        attributes: {
            exclude: ["password", "createdAt", "updatedAt", "email"]
        }
    })
    .then(users => res.status(200).send(users))
    .catch(error => error.status(400).send())
}

module.exports = {
    getAllUsers
}