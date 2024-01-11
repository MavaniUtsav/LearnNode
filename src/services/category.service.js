const Category = require("../model/category.model")


const createCategory = (reqBody) => {
    return Category.create(reqBody)
}

const getCategory = () => {
    return Category.find()
}

const getCategpryById = (reqId) => {
    return Category.findById(reqId)
}

const deletecategory = (reqId) => {
    return Category.findByIdAndDelete(reqId)
}

const updateCategory = (reqId,reqBody) => {
    return Category.findByIdAndUpdate(reqId,reqBody)
}

module.exports = {
    createCategory,
    getCategory,
    deletecategory,
    updateCategory,
    getCategpryById
}