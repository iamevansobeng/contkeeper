const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = function (req, res, next) {
    // GET THE TOKEN FROM THE HEADER
    const token = req.header('x-auth-token')

    // CHECK IF TOKEN DOES NOT EXIST
    if (!token) {
        return res.status(401).json({ msg: "No token. Authorisation Denied !!" })
    }

    try {
        // CHECKING IF TOKEN IS VALID
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        req.user = decoded.user

        next()
    } catch (err) {
        res.status(401).json({ msg: "Token is not Valid" })
        console.error(err.message)
    }
}