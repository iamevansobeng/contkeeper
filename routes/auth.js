const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')


// @route   GET api/auth
// @desc    Get logged in User
// @access  Private
//  dg So Onyankopɔn Dwen Yɛn ho Ampa?
//  

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})


// @route   Post api/auth
// @desc    Auth User and get token
// @access  Public
router.post('/', [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Ceredentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Ceredentials" })
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        // Signing and sending tokens
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000000,

        }, (err, token) => {
            if (err) throw err
            res.json({ token })
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})




module.exports = router