const express = require('express')
const router = express.Router()
const custController = require('../controllers/custC')
const sellerController = require('../controllers/sellerC')
const seller = require('./seller')
const cust = require('./cust')

router.use('/', cust)
router.use('/', seller)

module.exports = router