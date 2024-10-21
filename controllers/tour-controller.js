const prisma = require("../config/prisma")
const cloudinary = require('cloudinary').v2;
 

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
        const tour = await prisma.tourCompany.findMany()
        console.log(tour)
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
        const { location, tour, details, price, quantity, startDate, endDate, images } = req.body
        console.log(req.body)
        const trip = await prisma.trip.create({
            data: {
                locationId: +location,
                tourCompanyId: +tour,
                detail: details,
                price: +price,
                quantity,
                startdate: new Date(startDate),
                enddate: new Date(endDate),
                Image: {
                    create: images.map((item) => ({
                        assetId: item.asset_id,
                        publicId: item.public_id,
                        url: item.url,
                        secureUrl: item.secure_url
                    }))
                }
            }
        })
        res.status(201).json({ message: "Trip created successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server postTrip Error" })
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
                tourCompany: true,
                Image: true
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
//ใช้ตอน search ตามจำนวนเงิน
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
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}


//ใช้ตอนกดการ์ดเลือกสถานที่หลัง search
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


//ใช้แสดงทริปกรณียังไม่มีการ Search
exports.getTripByDate = async (req, res) => {
    try {
        // const { startdate, enddate } = req.body
        const today = new Date()
        const dayOnly = new Date(today.setHours(0, 0, 0, 0))
        const sevenDay = new Date(today.setDate(today.getDate() + 7))
        console.log("Ju test",sevenDay)
        const getTripByDate = await prisma.trip.findMany({
            where: {
                startdate: {
                    gte: dayOnly,
                    lte: sevenDay
                }
            },
            include: {
                location: true,
                tourCompany: true
            }
        })
        res.send(getTripByDate)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}


//ใช้สำหรับตอนสร้างทริปของ owner
exports.getLocation = async (req, res) => {
    try {
        const LocationTour = await prisma.location.findMany()
        res.send(LocationTour)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server LocationTour Error" })
    }
}



exports.createImages = async (req, res) => {
    try {
        //code
        // console.log(req.body)
        const result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `Roitai-${Date.now()}`,
            resource_type: 'auto',
            folder: 'Ecom2024'
        })
        res.send(result)
    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}
exports.removeImage = async (req, res) => {
    try {
        //code
        const { public_id } = req.body
        // console.log(public_id)
        cloudinary.uploader.destroy(public_id, (result) => {
            res.send('Remove Image Success!!!')
        })

    } catch (err) {
        //err
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

// exports.getUpcomingTrip = async (req, res) => {
//     try {
//         const currentDate = new Date();

//         // Query trips that are after the current date and order by start date (ascending)
//         const trip = await prisma.trip.findMany({
//             where: {
//                 startDate: {
//                     gte: currentDate // ดึงข้อมูลทริปที่เริ่มหลังจากวันนี้
//                 }
//             },
//             include: {
//                 location: true,
//                 tourCompany: true
//             },
//             orderBy: {
//                 startDate: 'asc' // เรียงลำดับจากวันที่ใกล้ถึงที่สุด
//             },
//             take: 1 // จำกัดผลลัพธ์ให้ได้เพียง 1 รายการ
//         })

//         res.status(200).json({ trip })
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ message: "Server getUpcomingTrip Error" })
//     }
// }


exports.getUpcomingTrip = async (req, res) => {
    try {
        const today = new Date()
        const dayOnly = new Date(today.setHours(0, 0, 0, 0))
        const sevenDay = new Date(today.setDate(today.getDate() + 7))
        const trip = await prisma.trip.findMany({
            where: {
                startdate: {
                    gte: dayOnly,
                    lte: sevenDay
                }
            },
            include: {
                location: true,
                tourCompany: true,
                Image: true
            },
            orderBy: {
                startdate: 'asc' // เรียงลำดับจากวันที่ใกล้ถึงที่สุด
            },
            take: 1 // จำกัดผลลัพธ์ให้ได้เพียง 1 รายการ
        })
        res.status(200).json({ trip })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}