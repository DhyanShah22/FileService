const express = require('express')

const {
    signupUser,
    loginUser
} = require('../Controllers/userControllers')

const router = express.Router()

router.post('/login', loginUser)

ReportingObserver.post('/signup', signupUser)

module.exports = router