const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.postBooking = async (req, res) => {
    try {
        const { tripId, userId, name, phoneNumber } = req.body
        const booking = await prisma.booking.create({
            data: {
                tripId: +tripId,
                userId: +userId,
                name,
                phoneNumber,
            }
        })
        res.status(201).json({ message: "Booking created successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Booking Error" })
    }
}
