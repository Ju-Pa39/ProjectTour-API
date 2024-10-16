const express = require("express")
const { route } = require("./auth-routes")
const authCheck = require("../middlewares/authCheck")
const { listUser } = require('../controllers/user')
const router = express.Router()

router.get('/user', listUser)
router.post('/change-status')
router.post('/change-role')


router.post('/user/cart')
router.get('/user/cart')
router.delete('/user/cart')

router.post('/user/address')

router.post('user/order')
router.get('/user/order')