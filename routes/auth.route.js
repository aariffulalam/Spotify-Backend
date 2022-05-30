const router = require('express').Router();

const { signup, login, logout } = require('../controller/auth.controller')

router.post('/auth/user', signup)

router.get('/auth/user', login)

router.get('/user/logout', logout)

module.exports = router;