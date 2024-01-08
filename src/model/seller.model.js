const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        pickup_address: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },
        mobile_no: {
            type: Number,
            required: true,
            minlength: 10
        },
        password: {
            type: String,
            required: true,
        },
        gst_no: {
            type: String,
            required: true
        },
        refresh_token: {
            type: String,
        },
        is_Active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

const Seller = mongoose.model('Seller', sellerSchema)
module.exports = Seller;