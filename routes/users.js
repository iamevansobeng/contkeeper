const express = require('express')
const { check, validationResult } = require('express-validator')

const router = express.Router()

const User = require('../models/User')

// @route   POST api/users
// @desc    Register a user
// @access  Public

router.post('/', [
    check('name', 'Please your name is required').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check('password', "Please enter a password with 6 or more characters").isLength({ min: 6 })
], (req, res) => {
    res.send(req.body)
})

module.exports = router