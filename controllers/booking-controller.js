const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.postBooking = async (req, res) => {
    try {
        const { tripId, userId, name, phoneNumber, images, LINE, nickName, age } = req.body
        console.log(req.body)
        const booking = await prisma.booking.create({
            data: {
                tripId: +tripId,
                userId: +userId,
                name,
                nickName,
                phoneNumber,
                LINE,
                age: +age,
                Image: {
                    create: images.map((item) => ({
                        tripId: +tripId,
                        assetId: item.asset_id,
                        publicId: item.public_id,
                        url: item.url,
                        secureUrl: item.secure_url
                    }))
                }
            }
        })
        console.log(booking)
        res.status(201).json({ message: "Booking created successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Booking Error" })
    }
}

exports.getBooking = async (req, res) => {
    try {
        const booking = await prisma.booking.findMany({
            include: {
                trip: true,
                user: true,
                Image: true,
                trip: {
                    include: {
                        location: true,
                        tourCompany: true,
                    }
                }
                
            },
            where: {
                OR: [
                    { payMentStatus: 'PENDING' },
                    { payMentStatus: 'CANCEL' }
                ]
            }
        })
        res.status(200).json(booking)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Booking Error" })
    }
}



exports.patchBooking = async (req, res) => {
    try {
        const { id } = req.params
        const { payMentStatus } = req.body
        const booking = await prisma.booking.update({
            where: {
                id: +id
            },
            data: {
                payMentStatus: payMentStatus,
            }
        })
        const bookingList = await prisma.booking.findMany({
            include: {
                trip: true,
                user: true,
                Image: true,
                trip: {
                    include: {
                        location: true,
                        tourCompany: true,
                    }
                }
            },
            where: {
                OR: [
                    { payMentStatus: 'PENDING' },
                    { payMentStatus: 'CANCEL' }
                ]
            }
        })
        res.status(200).json( bookingList )
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Booking Error" })
    }
}