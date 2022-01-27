var express = require('express');
var router = express.Router();

/* GET home page. */
controllers = require("../controllers/requests.js")

router.get('/incoming', controllers.getIncoming)
router.get('/outgoing', controllers.getOutgoing)

router.post('/', controllers.createRequest)
router.post('/:id/approve', controllers.approveRequest)
router.post('/:id/reject', controllers.rejectRequest)

router.patch('/:id', controllers.editRequest)

module.exports = router;
