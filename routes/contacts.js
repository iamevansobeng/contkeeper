const express = require('express')
const { check, validationResult } = require('express-validator')
const router = express.Router()

const auth = require('../middleware/auth')

const User = require('../models/User')
const Contact = require('../models/Contact')

// @route   GET  api/contacts
// @desc    Get al user's Contact
// @access  Private

router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
        res.json(contacts)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route   Post  api/contacts
// @desc    Add new Contact
// @access  Private

router.post('/', (req, res) => {
    res.send('Add contacts')
})

// @route   Put  api/contacts/:id
// @desc    Update Contact
// @access  Private

router.put('/:id', (req, res) => {
    res.send('Update Contact')
})

// @route   DELETE  api/contacts/:id
// @desc    DELETE Contact
// @access  Private

router.delete('/:id', (req, res) => {
    res.send('Delete Contact')
})

module.exports = router