const express = require("express")
const router = express.Router()
const {register,login, currentUser} = require('../controllers/auth-controller')
const { authCheck } = require("../middlewares/authCheck")



router.post("/register",register)
router.post("/login",login )

router.post("/current-user",authCheck,currentUser)


    module.exports = router