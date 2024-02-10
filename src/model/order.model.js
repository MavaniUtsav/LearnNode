const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        pid: {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        },
        qty: {
            type: Number,
            required: true
        }
    }
)

const orderSchema = mongoose.Schema(
    {
        products: [productSchema],
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        seller_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Seller'
        },
        shipping_address: {
            type: String,
            // required: true,
            trim: true
        },
        // order_type: {
        //     type: String, // "Prepaid" or "COD",
        //     enum: ["Prepaid","COD"]
        // },
        payment_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Payment'
        },
        status: {
            type: String,
            enum: ['Pending','Ready to ship','In Transit','Delivered'],
            required: true
        },
        discount: {
            type: Number,
            default: 0,
        },
        // totalPrice: {
        //     type: Number,
        //     required: true
        // }
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model('order', orderSchema)
module.exports = Order;