const express = require('express')
const router = express.Router()
const custController = require('../controllers/custC')
const sellerController = require('../controllers/sellerC')
const seller = require('./seller')
const cust = require('./cust')

router.get('/')
router.use('', cust)

router.get('/seller') //homepage seller
router.use('/seller', seller)

module.exports = router