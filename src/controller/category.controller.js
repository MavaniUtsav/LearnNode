const Category = require("../model/category.model");
const { createCategoryService, getCategoryService } = require("../services/category.service");


const createCategory = async (req,res) => {
    try {
        let category = await Category(createCategoryService(req.body))

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

const getCategory = async (req,res) => {
    try {
        let category = await getCategoryService()
        console.log(category);
        if (!category) {
            throw new Error('Create category error:')
        }

        res.status(200).json({
            success: true
        })
    } catch (error) {
        
    }
}

module.exports = {
    createCategory,
    getCategory
}