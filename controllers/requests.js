const requestService = require('../services/requestServices')
const User = require('../models').User
const Request = require('../models').Request

const getUserRequestById = async(req, incomingRequest = false) => {
    var { id } = requestService.getUserDataFromReq(req)
    var requestId = parseInt(req.params.id);
    var condition = {id: requestId}
    if(incomingRequest){
        condition = {...condition, toUser: id}
    }else{
        condition = {...condition, fromUser: id}
    }
    var requests = await Request.findAll({
        where: condition
    })
    console.log("CONDITION: ", condition)
    console.log("RESULTS: ", requests)
    return requests && requests[0]
}

const getIncoming = async(req, res, next) => {
    var userData = requestService.getUserDataFromReq(req)
    console.log(userData)
    return Request.findAll({
        where: {
            toUser: userData.id
        },
        include: {
            model: User,
            as: "FromUser"
        }
    })
    .then(requests => res.status(200).send(requests))
    .catch(error => res.status(500).send(error))
}

const getOutgoing = (req, res, next) => {
    var userData = requestService.getUserDataFromReq(req)
    return Request.findAll({
        where: {
            fromUser: userData.id
        },
        include: {
            model: User,
            as: 'ToUser'
        }
    })
    .then(requests => res.status(200).send(requests))
    .catch(error => res.status(500).send())
}

const createRequest = async(req, res, next) => {
    var { toUser, time, message } = req.body;
    var { id: fromUser } = requestService.getUserDataFromReq(req);
    time = new Date(Date.parse(time))
    var status = "PENDING"

    return Request.create({toUser, fromUser, time, message, status})
    .then(model => res.status(201).send(model))
    .catch(error => res.status(400).send())
}

const approveRequest = async(req, res, next) => {
    var request = await getUserRequestById(req, true)
    if(!request){
        return res.status(404).send({
            error: "Request with id does not exist"
        })
    }
    if(request.status != "PENDING"){
        return res.status(400).send({
            error: "Can not edit request once the other user has decided"
        })
    }
    request.status = "ACCEPTED"
    return request.save()
    .then(result => res.send(202).send(request))
    .catch(error => res.status(400).send())
}

const rejectRequest = async(req, res, next) => {
    var request = await getUserRequestById(req, true)
    if(!request){
        return res.status(404).send({
            error: "Request with id does not exist"
        })
    }
    if(request.status != "PENDING"){
        return res.status(400).send({
            error: "Can not edit request once the other user has decided"
        })
    }
    request.status = "REJECTED"
    return request.save()
    .then(result => res.send(202).send(request))
    .catch(error => res.status(400).send())
}

const editRequest = async(req, res, next) => {
    var request = await getUserRequestById(req)
    if(!request){
        return res.status(404).send({
            error: "Request with id does not exist"
        })
    }
    if(request.status != "PENDING"){
        return res.status(400).send({
            error: "Can not edit request once the other user has decided"
        })
    }

    const { time, message } = req.body;
    request.time = new Date(Date.parse(time));
    request.message = message;

    return request.save()
    .then(result => res.status(200).send(result))
    .catch(error => res.status(400).send())
}

const deleteRequest = async(req, res, next) => {
    var request = await getUserRequestById(req)
    if(!request){
        return res.status(404).send({
            error: "Request with id does not exist"
        })
    }

    return request.destroy(request.id)
    .then(result => res.status(204).send())
    .catch(error => res.status(400).send())
}


module.exports = {
    getIncoming,
    getOutgoing,
    createRequest,
    deleteRequest,
    approveRequest,
    rejectRequest,
    editRequest
}