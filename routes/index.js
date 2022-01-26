var express = require('express');
var router = express.Router();

/* GET home page. */
controllers = require("../controllers/index.js")

router.get('/', controllers.ping)
module.exports = router;
