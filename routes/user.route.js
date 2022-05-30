const router = require('express').Router();

const { songRating } = require('../controller/user.controller')
const { verifyToken } = require('../middleware/auth.middleware')

router.post('/user', verifyToken, songRating)

module.exports = router