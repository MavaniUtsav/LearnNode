const express = require('express')

const router = express.Router()

const usersRoute = require('./users.routes')
const productsRoute = require('./products.routes')
const categoryRoute = require('./category.routes')
const subCategoryRoute = require('./subcategory.routes')
const productRoute = require('./products.routes')
const variantRoute = require('./variant.routes')

router.use('/users', usersRoute)
router.use('/products', productsRoute)
router.use('/category', categoryRoute)
router.use('/subcategory', subCategoryRoute)
router.use('/product', productRoute)
router.use('/variant', variantRoute)

module.exports = router