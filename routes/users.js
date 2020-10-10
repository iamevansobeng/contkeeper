const express = require('express')
const bcrypt = require('bcryptjs')
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
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
        // CHECH WHETER THER EMAIL IS ONLY ONE IN THE DATABSE (is unique)
        let user = await User.findOne({ email })

        // send error message if user exists 
        if (user) {
            res.status(400).json({ msg: "User already exists" })
        }

        // Pass info to a new user ( create a news user )
        user = new User({
            name,
            email,
            password
        })

        // Hashing the password 
        // generation a salt and using the salt
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        // saving the user
        await user.save()
        res.send('User saved')

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router