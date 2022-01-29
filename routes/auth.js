var express = require('express');
var router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware')

/* GET home page. */
controllers = require("../controllers/auth.js")

router.post('/signup', controllers.signup)
router.post('/login', controllers.login)
router.get('/user', authMiddleware.verifyToken, controllers.getUser)
router.delete('/logout', controllers.logout)
module.exports = router;
