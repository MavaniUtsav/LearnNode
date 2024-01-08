const express = require('express')

const router = express.Router()

const usersRoute = require('./users.routes')
const productsRoute = require('./products.routes')
const categoryRoute = require('./category.routes')

router.use('/users', usersRoute)
router.use('/products', productsRoute)
router.use('/category', categoryRoute)

module.exports = router