const { subCategoryService } = require("../services");


const createSubCategory = async (req,res) => {
    try {
        const subcategory = await subCategoryService.createSubCategory(req.body)

        if (!subcategory) {
            new Error('Error to create category:')
        }

        res.status(200).json({
            status:'success',
            message:"Subcategory created successfully",
        })
    } catch (error) {
        console.log(error.message);
    }
}

const getSubCategory = async (req,res) => {
    try {
        const subcategory = await subCategoryService.getSubCategory()

        if (!subcategory) {
            new Error('Error to create category:')
        }

        res.status(200).json({
            status:'success',
            data: subcategory
        })
    } catch (error) {
        console.log(error.message);
    }
}

const getSubCategoryById = async (req,res) => {
    try {
        let subcategory = await subCategoryService.getSubCategoryById(req.params.id)

        if (!subcategory) {
            throw new Error('Get subcategory error:')
        }

        res.status(200).json({
            success: true,
            data: subcategory
        })
    } catch (error) {
        console.log(error.message);
    }
}

const deleteSubCategory = async (req,res) => {
    try {
        let subcategory = await subCategoryService.deleteSubCategory(req.params.id)

        if (!subcategory) {
            throw new Error('Delete category error:')
        }

        res.status(200).json({
            success: true,
            message: 'Subcategory deleted!!'
        })
    } catch (error) {
        console.log(error.message);
    }
}

const updateSubCategory = async (req,res) => {
    try {
        let subcategory = await subCategoryService.updateSubCategory(req.params.id,req.body)

        if (!subcategory) {
            throw new Error('Update subcategory error:')
        }

        res.status(200).json({
            success: true,
            message: 'Subcategory Updated!!',
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createSubCategory,
    getSubCategory,
    getSubCategoryById,
    deleteSubCategory,
    updateSubCategory
}