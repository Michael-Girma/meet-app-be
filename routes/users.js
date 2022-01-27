var express = require('express');
var router = express.Router();

/* GET home page. */
controllers = require("../controllers/users.js")

router.get('/', controllers.getAllUsers)

module.exports = router;
