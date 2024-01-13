const mongoose = require('mongoose');

const variantSchema = mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        },
        color: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        images: {
            type: [String],
            default: []
        },
        stock: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Variant = mongoose.model('Variant', variantSchema)
module.exports = Variant;