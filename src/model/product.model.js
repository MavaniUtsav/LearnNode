const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Category'
        },
        subcategory_id: {
            type: mongoose.Types.ObjectId,
            ref: 'SubCategory'
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product;