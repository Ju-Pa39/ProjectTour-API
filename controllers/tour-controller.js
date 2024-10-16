const prisma = require("../config/prisma")

// สร้างบริษัททัวร์
exports.postTour = async (req, res) => {
    try {
        const { name, tourNumber, line, phoneNumber, userId } = req.body
        const tour = await prisma.tourCompany.create({
            data: {
                userId: +userId,
                name,
                tourNumber,
                line,
                phoneNumber
            }
        })
        res.status(201).json({ message: "Tour created successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.getTour = async (req, res) => {
    try {
        const tour = await prisma.tourCompany.findMany({
            include: {
                user: true,
                trip: true
            }
        })
        res.status(200).json({ tour })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.getTourById = async (req, res) => {
    try {
        const { id } = req.params
        const tour = await prisma.tourCompany.findUnique({
            where: {
                id: +id
            }
        })
        res.status(200).json({ tour })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.updateTour = async (req, res) => {
    try {
        const { id } = req.params
        const { name, tourNumber, line, phoneNumber, userId } = req.body
        const tour = await prisma.tourCompany.update({
            where: {
                id: +id
            },
            data: {
                name,
                tourNumber,
                line,
                phoneNumber,
                userId: +userId
            }
        })
        res.status(200).json({ message: "Tour updated successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.deleteTour = async (req, res) => {
    try {
        const { id } = req.params
        const tour = await prisma.tourCompany.delete({
            where: {
                id: +id
            }
        })
        res.status(200).json({ message: "Tour deleted successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}




// สร้างบริษัททริปเพื่อเปป็นข้อมูลให้ลูกค้าเลือก
exports.postTrip = async (req, res) => {
    try {
        const { location_Id, tourCompany_Id, detail, price, quantity, startdate, enddate, image } = req.body
        const trip = await prisma.trip.create({
            data: {
                locationId: +location_Id,
                tourCompanyId: +tourCompany_Id,
                detail,
                price,
                quantity,
                startdate: new Date(Date.now()),
                enddate: new Date(Date.now()),
                // startdate: new Date(startdate), // ตรวจสอบว่ามีค่าและแปลงเป็น Date
                // enddate: new Date(enddate) 
                Image: {
                    create: image.map((item) => ({
                        assetId: item.assetId,
                        publicId: item.publicId,
                        url: item.url,
                        secureUrl: item.secureUrl,
                    }))
                }
            }
        })
        res.status(201).json({ message: "Trip created successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.getTrip = async (req, res) => {
    try {
        const trip = await prisma.trip.findMany({
            include: {
                location: true,
                tourCompany: true
            }
        })
        res.status(200).json({ trip })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.getTripById = async (req, res) => {
    try {
        const { id } = req.params
        const trip = await prisma.trip.findUnique({
            where: {
                id: +id
            },
            include: {
                location: true,
                tourCompany: true
            }
        })
        res.status(200).json({ trip })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.updateTrip = async (req, res) => {
    try {
        const { id } = req.params
        const { location_Id, tourCompany_Id, detail, price, quantity, startdate, enddate, image } = req.body
        const trip = await prisma.trip.update({
            where: {
                id: +id
            },
            data: {
                locationId: +location_Id,
                tourCompanyId: +tourCompany_Id,
                detail,
                price,
                quantity,
                startdate: new Date(Date.now()),
                enddate: new Date(Date.now()),
                // startdate: new Date(startdate), // ตรวจสอบว่ามีค่าและแปลงเป็น Date
                // enddate: new Date(enddate)
                Image: {
                    create: image.map((item) => ({
                        assetId: item.assetId,
                        publicId: item.publicId,
                        url: item.url,
                        secureUrl: item.secureUrl,
                    }))
                }
            }
        })
        res.status(200).json({ message: "Trip updated successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.deleteTrip = async (req, res) => {
    try {
        const { id } = req.params
        const trip = await prisma.trip.delete({
            where: {
                id: +id
            }
        })
        res.status(200).json({ message: "Trip deleted successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.listTrip = async (req, res) => {
    try {
        const { sort, order, limit } = req.body
        const trip = await prisma.trip.findMany({
            take: limit,
            orderBy: { [sort]: order },
            include: { location: true }
        })

        res.send(trip)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}




const hdlQuery = async (req, res, query) => {
    try {
        const trip = await prisma.trip.findMany({
            where: {
                location: {
                    name: {
                        contains: query
                    }
                }
            },
            select: {
                id: true,
                location: {
                    select: {
                        name: true
                    }
                },
                tourCompany: {
                    select: {
                        name: true,
                        tourNumber: true
                    }
                }
            }
        })
        res.send(trip)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}
const hdlPrice = async (req, res, price) => {
    try {
        const trip = await prisma.trip.findMany({
            where: {
                price: {
                    gte: price[0],
                    lte: price[1]
                }
            },
            include: {
                location: true,
                tourCompany: true
            }
        })
        res.send(trip)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}
const hdlStartDate = async (req, res, startdate) => {
    try {
        const trip = await prisma.trip.findMany({
            where: {
                startdate: {
                    gte: new Date(startdate)
                }
            }
        })
        res.send(trip)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.searchFilters = async (req, res) => {
    try {
        const { query, price,startdate } = req.body
        if (query) {
            console.log('query-->', query)
            await hdlQuery(req, res, query)
        }
        
        if (price) {
            console.log('price-->', price)
            await hdlPrice(req, res, price)
        }
        if (startdate) {
            console.log('startdate-->', startdate)
            await hdlStartDate (req, res ,startdate)
        }
        // res.send("testtttt")
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.getLocationById = async (req, res) => {
    try {
        const { id } = req.params
        const location = await prisma.location.findUnique({
            where: {
                id: +id
            },
            include: {
                trip: {
                    include: {
                        tourCompany: true
                    }
                }
                
            }
        })
        res.send(location)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server getLocationById Error" })
    }
}