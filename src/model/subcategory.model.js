const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema(
    {
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Category'
        },
        subcategory_name: {
            type: String,
            required: true,
            trim: true
        },
        subcategory_description: {
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

const SubCategory = mongoose.model('SubCategory', subCategorySchema)
module.exports = SubCategory;