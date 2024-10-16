const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// const location = [
//     {name:"ภูสอยดาว",houseNumber: "",county: "ประเทศไทย",district:"บ้านโคก",suDistrict:"บ้านโคก",province:"อุตรดิตถ์",zipCode:"53110" },
//     {name:"ภูกระดึง",houseNumber: "119",county: "ประเทศไทย",district:"ภูกระดึง",suDistrict:"ภูกระดึง",province:"เลย",zipCode:"42180" },
//     {name:"เปรโต๊ะลอซู",houseNumber: "",county: "ประเทศไทย",district:"อุ้มผาง",suDistrict:"อุ้มผาง",province:"ตาก",zipCode:"63170" },
//     {name:"ม่อนจอง",houseNumber: "",county: "ประเทศไทย",district:"อมก๋อย",suDistrict:"อมก๋อย",province:"เชียงใหม่",zipCode:"50310" },
//     {name:"ดอยหลวงตาก",houseNumber: "",county: "ประเทศไทย",district:"ทุ่งกระเชาะ",suDistrict:"บ้านตาก",province:"ตาก",zipCode:"63120" },
//     {name:"เขาช้างเผือก",houseNumber: "",county: "ประเทศไทย",district:"ปิล็อก",suDistrict:"ทองผาภูมิ",province:"กาญจนบุรี",zipCode:"71180" },
//     {name:"เขาหลวงเชียงดาว",houseNumber: "",county: "ประเทศไทย",district:"เชียงดาว",suDistrict:"เชียงดาว",province:"เชียงใหม่",zipCode:"50170" },
//     {name:"ดอยขุนตาล",houseNumber: "",county: "ประเทศไทย",district:"ทาปลาดุก",suDistrict:"แม่ทา",province:"ลำพูน",zipCode:"51140" },
//     {name:"เขาหลวงสุโขทัย",houseNumber: "",county: "ประเทศไทย",district:"คีรีมาศ",suDistrict:"คีรีมาศ",province:"สุโขทัย",zipCode:"64170" },
// ]

const user = [
    { email: "admin1@gmail.com", password: "123456", firstName: "admin", lastName: "admin", phone: "0999999999", role: "OWNER" },
    { email: "user12233@gmail.com", password: "123456", firstName: "user", lastName: "user", phone: "0999999999", role: "CUSTOMER" },
    { email: "user214@gmail.com", password: "123456", firstName: "user2", lastName: "user2", phone: "0999999999", role: "CUSTOMER" },
    { email: "user351@gmail.com", password: "123456", firstName: "user3", lastName: "user3", phone: "0999999999", role: "CUSTOMER" },
    { email: "user41Qwe123455@gmail.com", password: "123456", firstName: "user4", lastName: "user4", phone: "0999999999", role: "CUSTOMER" },
    { email: "admin62@gmail.com", password: "123456", firstName: "admin", lastName: "admin", phone: "0999999999", role: "OWNER" },
    { email: "admin73@gmail.com", password: "123456", firstName: "admin", lastName: "admin", phone: "0999999999", role: "OWNER" },
    { email: "admin47@gmail.com", password: "123456", firstName: "admin", lastName: "admin", phone: "0999999999", role: "OWNER" },
]

// const trip = [
//     {locationId:6,tourCompanyId:1,detail:"ทดสอบ",price:4000,quantity:10,startdate:new Date(Date.now()),enddate:new Date(Date.now())},
//     {locationId:4,tourCompanyId:1,detail:"ทดสอบ",price:4500,quantity:10,startdate:new Date(Date.now()),enddate:new Date(Date.now())},
//     {locationId:5,tourCompanyId:1,detail:"ทดสอบ",price:4600,quantity:10,startdate:new Date(Date.now()),enddate:new Date(Date.now())},
//     {locationId:2,tourCompanyId:1,detail:"ทดสอบ",price:2000,quantity:10,startdate:new Date(Date.now()),enddate:new Date(Date.now())},
//     {locationId:1,tourCompanyId:1,detail:"ทดสอบ",price:2500,quantity:10,startdate:new Date(Date.now()),enddate:new Date(Date.now())},
//     {locationId:7,tourCompanyId:1,detail:"ทดสอบ",price:2700,quantity:10,startdate:new Date(Date.now()),enddate:new Date(Date.now())},


// ]

// const tourCompany = [
//     {name:" ",tourNumber:"",line:"",phoneNumber:"",userId:1},

// ]
async function run() {
    // await prisma.location.createMany({data: location})
    await prisma.user.createMany({ data: user })
    // await prisma.tourCompany.createMany({data: trip})
    // await prisma.trip.createMany({data: trip})
}

run()