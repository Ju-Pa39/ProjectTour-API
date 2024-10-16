const express = require("express")
const router = express.Router()
const { authCheck, ownerCheck} = require("../middlewares/authCheck")
const { postTour, getTour, updateTour, deleteTour, postTrip, getTrip, updateTrip, deleteTrip, getTripById,listTrip,searchFilters } = require("../controllers/tour-controller")


//Tour
router.post("/createTour",authCheck,ownerCheck, postTour)
router.get("/getTour",authCheck,ownerCheck, getTour)
router.patch("/getTour/:id",authCheck,ownerCheck, updateTour)
router.delete("/getTour/:id",authCheck,ownerCheck, deleteTour)

//Trip
router.post("/createTrip",authCheck,ownerCheck, postTrip)
router.get("/getTrip", getTrip)
router.get("/getTrip/:id", getTripById)
router.patch("/getTrip/:id",authCheck,ownerCheck, updateTrip)
router.delete("/getTrip/:id",authCheck,ownerCheck, deleteTrip)
router.post("/tripBy", listTrip)
router.post("/search", searchFilters)
module.exports = router