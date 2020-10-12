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

router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // CREATING A NEW CONTACT
    const { name, email, phone, type } = req.body

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id,
        })
        const contact = await newContact.save()

        res.json(contact)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route   Put  api/contacts/:id
// @desc    Update Contact
// @access  Private

router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body

    // Build a contact Object
    const contactFields = {}
    if (name) contactFields.name = name
    if (email) contactFields.email = email
    if (phone) contactFields.phone = phone
    if (type) contactFields.type = type

    try {
        let contact = await Contact.findById(req.params.id)

        if (!contact) return res.status(404).json({ msg: 'Contacts not Found' })

        // MAKING SURE USER OWNS CONTACTS
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorised' })
        }
        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true })
        res.json(contact)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

// @route   DELETE  api/contacts/:id
// @desc    DELETE Contact
// @access  Private

router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id)

        if (!contact) return res.status(404).json({ msg: 'Contact does not exist' })

        // MAKING SURE USER OWNS CONTACTS
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not Authorised' })
        }
        await Contact.findByIdAndRemove(req.params.id)

        res.json({ msg: "Contact Removed" })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router