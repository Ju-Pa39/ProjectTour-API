const express = require("express")
const app = express()
const morgen = require("morgan")
const cors = require('cors')

const authRouter =require("./routes/auth-routes")
const tourRouter = require("./routes/tour-routes")

const bookingRouter = require("./routes/booking-router")

app.use(morgen('dev'))
app.use(express.json())
app.use(cors())

app.use("/auth",authRouter)
app.use("/admin",tourRouter)
app.use("/user",bookingRouter)


app.listen(8000, () => console.log('Server test 8000'))

 