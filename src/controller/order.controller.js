const db = require("../db/mysql");
const { OrdersModel } = require("../model");
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

const createOrder = async (req,res) => {
    try {
        const { CNAME, CITY, RATING, SNUM } = req.body
        console.log(CNAME, CITY, RATING, SNUM);

        const sql = 'INSERT INTO customer (CNAME, CITY,RATING,SNUM) VALUES (?, ?, ?, ?)'
        const result = OrdersModel.orders(sql,[CNAME, CITY, RATING, SNUM])
        
        if (!result) {
            res.status(500).json({
                message: 'Internal server error!!'
            })
        }

        res.status(200).json({
            message: 'Order created successfully',
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports ={
    getOrder,
    createOrder
}

