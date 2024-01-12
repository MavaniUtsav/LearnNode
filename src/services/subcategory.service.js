const SubCategory = require("../model/subcategory.model")

const createSubCategory = (reqBody) => {
    return SubCategory.create(reqBody)
}

const getSubCategory = () => {
    return SubCategory.find()
}

const getSubCategoryById = (reqId) => {
    return SubCategory.findById(reqId)
}

const deleteSubCategory = (reqId) => {
    return SubCategory.findByIdAndDelete(reqId)
}

const updateSubCategory = (reqId,reqBody) => {
    return SubCategory.findByIdAndUpdate(reqId,reqBody)
}

module.exports = {
    createSubCategory,
    getSubCategory,
    getSubCategoryById,
    deleteSubCategory,
    updateSubCategory
}