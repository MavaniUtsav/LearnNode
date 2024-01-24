const Category = require("../model/category.model");
const { categoryService } = require("../services");
const { createCategoryService, getCategoryService } = require("../services/category.service");


const createCategory = async (req,res) => {
    try {
        let category = await categoryService.createCategory(req.body)

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
        let category = await categoryService.getCategory()
        console.log(category);
        if (!category) {
            throw new Error('Get category error:')
        }

        res.status(200).json({
            success: true,
            data: category
        })
    } catch (error) {
        console.log(error.message);
        
    }
}

const getCategoryById = async (req,res) => {
    try {
        let category = await categoryService.getCategoryById(req.params.id)
        console.log(category);
        if (!category) {
            throw new Error('Get category error:')
        }

        res.status(200).json({
            success: true,
            data: category
        })
    } catch (error) {
        console.log(error.message);
    }
}

const deleteCategory = async (req,res) => {
    try {
        let category = await categoryService.deletecategory(req.params.id)

        if (!category) {
            throw new Error('Delete category error:')
        }

        res.status(200).json({
            success: true,
            message: 'Category deleted!!'
        })
    } catch (error) {
        console.log(error.message);
    }
}

const updateCategory = async (req,res) => {
    try {
        let category = await categoryService.updateCategory(req.params.id,req.body)

        if (!category) {
            throw new Error('Update category error:')
        }

        res.status(200).json({
            success: true,
            message: 'Category Updated!!',
        })
    } catch (error) {
        console.log(error.message);
    }
}

const countActive = async (req,res) => {
    try {
        let activeCategory = await categoryService.countActive()

        if (!activeCategory) {
            throw new Error('Get active category error:')
        }

        res.status(200).json({
            success: true,
            data: activeCategory
        })
    } catch (error) {
        console.log(error.message);
    }
}

const mostProducts = async (req,res) => {
    try {
        let mostProducts = await categoryService.mostProducts()

        if (!mostProducts) {
            throw new Error('Get active category error:')
        }

        res.status(200).json({
            success: true,
            data: mostProducts
        })
    } catch (error) {
        console.log(error.message);
    }
}

const averageProducts = async (req,res) => {
    try {
        let averageProducts = await categoryService.averageProducts()

        if (!averageProducts) {
            throw new Error('Get active category error:')
        }

        res.status(200).json({
            success: true,
            data: averageProducts
        })
    } catch (error) {
        console.log(error.message);
    }
}

const countInActive = async (req,res) => {
    try {
        let countInActive = await categoryService.countInActive()

        if (!countInActive) {
            throw new Error('Get active category error:')
        }

        res.status(200).json({
            success: true,
            data: countInActive
        })
    } catch (error) {
        console.log(error.message);
    }
}

const countSubcategories = async (req,res) => {
    try {
        let countSubcategories = await categoryService.countSubcategories()

        if (!countSubcategories) {
            throw new Error('Get active category error:')
        }

        res.status(200).json({
            success: true,
            data: countSubcategories
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createCategory,
    getCategory,
    deleteCategory,
    updateCategory,
    getCategoryById,
    countActive,
    mostProducts,
    averageProducts,
    countInActive,
    countSubcategories
}