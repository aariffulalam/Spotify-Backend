const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();


exports.songRating = async (req, res) => {

    const { userId } = req
    // console.log("userId  -> ", userId)
    const { rating, songId } = req.body
    // console.log(rating, songId)
    try {
        const rate = await prisma.rating.create({
            data: {
                rating,
                songId,
                userId
            }
        })

        res.status(201).json({ status: 'reted succesfully', rate })
    } catch (error) {
        res.status(500).json({ status: "something Eroor occure", message: error.message })
    }
} 