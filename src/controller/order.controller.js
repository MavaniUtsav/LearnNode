const Order = require("../model/order.model");
const { orderService } = require("../services");
const makePdf = require("../utils/pdfMake");
const getOrder = async (req,res,next) => {
    try {
        const order = await orderService.getOrders();
        console.log('Retrieved order:', order);

        if (!order) {
            throw new Error('Get order error')
        }

        res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Error: '+ error.message
    })       
    }
}

module.exports ={
    getOrder
}

