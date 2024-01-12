const express = require('express')
const validate = require('../../middleware/validate')
const { productValidation } = require('../../validation')
const { productController } = require('../../controller')

const router = express.Router()

router.get(
    '/get-product',
    validate(productValidation.getProduct),
    productController.getProduct
)

router.get(
    '/get-product/:id',
    validate(productValidation.getProduct),
    productController.getProductById
)

router.post(
    '/list-product',
    validate(productValidation.createProduct),
    productController.createProduct
)

router.put(
    '/update-product/:id',
    validate(productValidation.updateProduct),
    productController.updateProduct
)

router.delete(
    '/delete-product/:id',
    validate(productValidation.deleteProduct),
    productController.deleteProduct
)
module.exports = router