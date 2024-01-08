const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
    {
        pid: {
            type: String,
            ref: 'Product'
        },
        qty: {
            type: Number,
            required: true
        }
    }
)

const cartSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        itmes: [itemSchema]
    },
    {
        timestamps: true
    }
)

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart;