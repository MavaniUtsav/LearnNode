const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        rating: {
            type: Number,
            required: true
        },
        comments: {
            type: String,
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        }
    },
    {
        timestamps: true
    }
)

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review;