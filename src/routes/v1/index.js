const express = require('express')

const router = express.Router()

const usersRoute = require('./users.routes')
const productsRoute = require('./products.routes')

router.use('/users', usersRoute)
router.use('/products', productsRoute)

module.exports = router