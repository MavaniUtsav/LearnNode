const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
    {
        gateway: {
            type: String, // PayPal, Stripe etc.
            required: true
        },
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Failed'],
            required: true
        },
        order_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Order'
        }
    },
    {
        timestamps: true
    }
)

const Payment = mongoose.model('Payment', paymentSchema)
module.exports = Payment;