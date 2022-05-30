const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt')
const salt = process.env.SALT
// console.log(salt)

const { generateToken } = require('../middleware/auth.middleware')

exports.signup = async (req, res) => {
    const { name, email, password } = req.body
    console.log(name, email, password)
    const hashedPassword = await bcrypt.hash(password, parseInt(salt))
    console.log(hashedPassword)
    const userSignup = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
    res.status(201).json({ status: "User singUp successfully.", message: userSignup })
}


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const userLogin = await prisma.user.findUnique({
            where: {
                email
            }
        })
        const isPasswordMatched = await bcrypt.compare(password, userLogin.password)
        // console.group(userLogin.id)
        if (isPasswordMatched) {
            const token = generateToken(userLogin.id)
            res.cookie('authToken', token)
            res.status(201).json({ status: "user Logedin successfully", message: userLogin })
        }
    } catch (error) {
        res.status(500).json({ status: "something error occure", message: error.message })
    }
}

exports.logout = async (req, res) => {
    res.clearCookie("authToken").send("logout successfully")
}