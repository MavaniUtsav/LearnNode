const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
        },
        mobile_no: {
            type: Number,
           minlength: 10
        },
        password: {
            type: String,
        },
        role: {
            type: String,
        },
        profile_pic: {
            type: {
                public_id: String,
                url: String
            }
        },
        refresh_token: {
            type: String,
        },
        is_Active: {
            type: Boolean,
            default: true
        },
        googleId: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)
module.exports = User;