const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const { postBooking, getBooking, patchBooking } = require("../controllers/booking-controller")
const { authCheck } = require('../middlewares/authCheck')


router.post("/booking", postBooking)//authCheck
router.get("/getBooking", getBooking)//authCheck
router.patch("/updatebookingstatus/:id", patchBooking)//authCheck


module.exports = router