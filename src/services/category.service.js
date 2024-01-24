const { CategoryModel } = require("../model")
const Category = require("../model/category.model")

const createCategory = (reqBody) => {
    return Category.create(reqBody)
}

const getCategory = () => {
    return Category.find()
}

const getCategoryById = (reqId) => {
    return Category.findById(reqId)
}

const deletecategory = (reqId) => {
    return Category.findByIdAndDelete(reqId)
}

const updateCategory = (reqId, reqBody) => {
    return Category.findByIdAndUpdate(reqId, reqBody)
}

const countActive = (reqBody) => {
    return Category.aggregate([
        {
            $match: {
                "is_Active": true
            }
        }
    ])
}

const countInActive = (reqBody) => {
    return Category.aggregate([
        {
            $match: {
                "is_Active": false
            }
        }
    ])
}

const mostProducts = () => {
    return Category.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category_id",
                as: "product",
            },
        },
        {
            $unwind: "$product",
        },
        {
            $group: {
                _id: "$_id",
                categoryName: { $first: "$category_name" },
                totalProducts: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: {
                "product.fieldToSortBy": -1,
            },
        },
        {
            $limit: 5,
        },
    ])
}

const averageProducts = () => {
    return Category.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category_id",
                as: "product",
            },
        },
        {
            $project: {
                _id: 1,
                category_name: 1,
                category_description: 1,
                noOfProducts: {
                    $size: "$product"
                }
            }
        },
    ])
}

const countSubcategories = () => {
    return Category.aggregate([
        {
            $lookup: {
                from: "subcategories",
                localField: "_id",
                foreignField: "category_id",
                as: "subcategory"
            }
        },
        { $unwind: "$subcategory" },
        {
            $group: {
                _id: "$_id",
                category_name: { $first: "$category_name" },
                category_desc: { $first: "$category_description" },
                totalSubCategory: {
                    $sum: 1
                }
            }
        }
    ])
}

module.exports = {
    createCategory,
    getCategory,
    deletecategory,
    updateCategory,
    getCategoryById,
    countActive,
    mostProducts,
    averageProducts,
    countInActive,
    countSubcategories
}