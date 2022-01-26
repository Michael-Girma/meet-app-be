const ping = (req, res, next) => {
    return res.status(200).send({
        status: "Pinged"
    })
}

module.exports = {
    ping
}