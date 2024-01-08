const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        category_name: {
            type: String,
            required: true,
            trim: true
        },
        category_description: {
            type: String,
            required: true,
            trim: true
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

const Category = mongoose.model('Category', categorySchema)
module.exports = Category;