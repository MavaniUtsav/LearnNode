const Category = require("../model/category.model")


const createCategoryService = (reqBody) => {
    return Category.create(reqBody)
}

const getCategoryService = () => {
    return Category.find()
}

module.exports = {
    createCategoryService,
    getCategoryService
}