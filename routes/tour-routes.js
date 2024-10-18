const express = require("express")
const router = express.Router()
const { authCheck, ownerCheck} = require("../middlewares/authCheck")
const { postTour, getTour, updateTour, deleteTour, postTrip, getTrip, updateTrip, deleteTrip, getTripById,listTrip,searchFilters, getLocationById, getTripByDate, getLocation } = require("../controllers/tour-controller")


//Tour
router.post("/createTour",authCheck,ownerCheck, postTour)
router.get("/getTour", getTour)//ใช้
router.patch("/getTour/:id",authCheck,ownerCheck, updateTour)
router.delete("/getTour/:id",authCheck,ownerCheck, deleteTour)

//Trip
router.post("/createTrip",authCheck,ownerCheck, postTrip)
router.get("/getTrip", getTrip)
router.get("/getTrip/:id", getTripById)
router.patch("/getTrip/:id",authCheck,ownerCheck, updateTrip)
router.delete("/getTrip/:id",authCheck,ownerCheck, deleteTrip)
router.post("/tripBy", listTrip)
router.post("/search", searchFilters)//ใช้
router.get("/getLocationById/:id",getLocationById)//ใช้
router.get("/getTripByDate",getTripByDate)//ใช้
router.get("/getLocation",getLocation)//ใช้
module.exports = router