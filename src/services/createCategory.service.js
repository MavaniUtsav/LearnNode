const Category = require("../model/category.model")


const createCategoryService = (reqBody) => {
    return Category.create(reqBody)
}

module.exports = {
    createCategoryService
}