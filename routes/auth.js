const express = require('express')

const router = express.Router()


// @route   GET api/auth
// @desc    Get logged in User
// @access  Private

router.get('/', (req, res) => {
    res.send('Get a logged in User')
})

// @route   Post api/auth
// @desc    Auth User and get token
// @access  Public

router.post('/', (req, res) => {
    res.send('Log in User')
})


module.exports = router