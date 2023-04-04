const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

exports.generateToken = (id, email) => {
    return jwt.sign({id, email},SECRET_KEY)
}

exports.verifyToken = async (req, res, next) => {
    const cookie = req.headers.cookie
    if (cookie) {
        const token = cookie.split("=")[1]
        const id = parseInt(jwt.verify(token, SECRET_KEY))
        req.userId = id;
        next()
    } else {
        res.status(401).json({ status: "User is not exist" })
    }
}