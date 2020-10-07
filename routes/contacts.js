const express = require('express')

const router = express.Router()


// @route   GET  api/contacts
// @desc    Get al user's Contact
// @access  Private

router.get('/', (req, res) => {
    res.send('Get All contacts')
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