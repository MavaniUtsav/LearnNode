const Category = require("../model/category.model");
const { createCategoryService } = require("../services/createCategory.service");


const createCategory = async (req,res) => {
    try {
        let category = Category(createCategoryService(req.body))

        if (!category) {
            throw new Error('Create category error:')
        }

        res.status(200).json({
            success: true,
            message: 'Category created'
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createCategory
}