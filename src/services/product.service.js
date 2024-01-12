const Product = require("../model/product.model")

const createProduct = (reqBody) => {
    return Product.create(reqBody)
}

const getProduct = () => {
    return Product.find()
}

const getProductById = (reqId) => {
    return Product.findById(reqId)
}

const deleteProduct = (reqId) => {
    return Product.findByIdAndDelete(reqId)
}

const updateProduct = (reqId,reqBody) => {
    return Product.findByIdAndUpdate(reqId,reqBody)
}

module.exports = {
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    getProductById
}