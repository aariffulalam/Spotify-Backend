const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

exports.generateToken = (id) => {
    return jwt.sign(id, SECRET_KEY)
}

exports.verifyToken = async (req, res, next) => {
    const cookie = req.headers.cookie
    // console.log("cookie");
    // console.log(cookie)
    if (cookie) {
        const token = cookie.split("=")[1]
        // console.log(token)
        const id = parseInt(jwt.verify(token, SECRET_KEY))
        console.log("i am token id", id);
        req.userId = id
        next()
    } else {
        res.status(401).json({ status: "User is not exist" })
    }
}