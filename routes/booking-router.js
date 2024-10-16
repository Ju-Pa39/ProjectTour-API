const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const { postBooking } = require("../controllers/booking-controller")
const { authCheck } = require('../middlewares/authCheck')


router.post("/booking",authCheck, postBooking)

module.exports = router