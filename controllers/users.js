const User = require("../models").User
const Request = require("../models").Request
const sequelize = require("../models").Sequelize
const requestServices = require('../services/requestServices')

const getAllUsers = (req, res, next) => {
    var userData = requestServices.getUserDataFromReq(req)
    return User.findAll({
        attributes: {
            exclude: ["password", "createdAt", "updatedAt", "email"]
        },
        where: {
            id: {
                [sequelize.Op.not] : userData.id
            }
        },
        include: [
            {
            model: Request,
            as: "IncomingRequests"
        },
        {
            model: Request,
            as: "OutgoingRequests"
        },
        
    ]
    })
    .then(users => {
        var usersResponse = users.map(user => {
            var dataValues = user.dataValues;
            console.log(userData.id)

            dataValues.IncomingRequests = dataValues.IncomingRequests.filter(request => {
                return (request.dataValues.fromUser == userData.id || request.dataValues.toUser == userData.id) && request.dataValues.status == "PENDING"
            })
            dataValues.OutgoingRequests = dataValues.OutgoingRequests.filter(request => {
                return (request.dataValues.fromUser == userData.id || request.dataValues.toUser == userData.id) && request.dataValues.status == "PENDING"

            })
            return dataValues
        })
        res.status(200).send(usersResponse)})
    .catch(error => error.status(400).send())
}

module.exports = {
    getAllUsers
}