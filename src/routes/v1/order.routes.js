const express = require('express')
const { getOrder } = require('../../controller/order.controller')
const { orderController } = require('../../controller')
const makePdf = require('../../utils/pdfMake')

const router = express.Router()

router.get(
    '/list-order',
    orderController.getOrder,
)

module.exports = router