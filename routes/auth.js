var express = require('express');
var router = express.Router();

/* GET home page. */
controllers = require("../controllers/auth.js")

router.post('/signup', controllers.signup)
module.exports = router;
