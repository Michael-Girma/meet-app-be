var express = require('express');
var router = express.Router();

/* GET home page. */
controllers = require("../controllers/auth.js")

router.post('/signup', controllers.signup)
router.post('/login', controllers.login)
router.delete('/logout', controllers.logout)
module.exports = router;
