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

const updateSubCategory = (reqId, reqBody) => {
    return SubCategory.findByIdAndUpdate(reqId, reqBody)
}

const parentOfSubcategory = (reqId) => {
    return SubCategory.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "category_id",
                foreignField: "_id",
                as: "category",
            },
        },
        {
            $unwind: "$category",
        },
        {
            $project: {
                _id: 1,
                category_name: "$category.category_name",
                category_description: "$category.category_description",
                subcategory_name: 1,
                subcategory_description: 1,
            }
        }
    ])
}


module.exports = {
    createSubCategory,
    getSubCategory,
    getSubCategoryById,
    deleteSubCategory,
    updateSubCategory,
    parentOfSubcategory
}