const express = require('express')
const { getOrder } = require('../../controller/order.controller')
const { orderController } = require('../../controller')
const makePdf = require('../../utils/pdfMake')
const { OrderValidation } = require('../../validation')

const router = express.Router()

router.get(
    '/list-order',
    orderController.getOrder,
)

router.post(
    '/create-order',
    // OrderValidation.createorder,
    orderController.createOrder,
)

module.exports = router