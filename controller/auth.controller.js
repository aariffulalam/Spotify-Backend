const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt')
const salt = process.env.SALT;
const { generateToken } = require('../middleware/auth.middleware')

exports.signup = async (req, res) => {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, parseInt(salt));
    const exitsUsers = await prisma.user.findMany({
        where:{
            email:email
        }
    });
    let userSignup = {};
    if (exitsUsers.length === 0){
        userSignup = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        res.status(200).json({ status: "User singUp successfully.", message: userSignup })
        return
    }
    res.status(200).json({ status: "User exist", message: userSignup})
    return
}


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userLogin = await prisma.user.findUnique({
            where: {
                email
            }
        })
        let isPasswordMatched = false;
        if (userLogin !== undefined && userLogin !== null){
            isPasswordMatched = await bcrypt.compare(password, userLogin.password);
        };
        if (isPasswordMatched) {
            const token = generateToken(userLogin.id, userLogin.email);
            res.cookie('authToken', token);
            res.status(200).json({ status: "user Logedin successfully", data: userLogin, token: token});
        }
        else {
            res.status(200).json({ status: "user doesn't exist", data: userLogin,  login: isPasswordMatched});
        }
        return
    } catch (error) {
        res.status(500).json({ status: "something error occure", data: error.message, login: false});
        return
    }
}

exports.logout = async (req, res) => {
    res.clearCookie("authToken").send("logout successfully")
    return
}