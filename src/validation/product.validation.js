
const joi = require('joi')

const createProduct = {
    body: joi.object().keys({
        category_id: joi.string().required(),
        subcategory_id: joi.string().required(),
        name: joi.string().required().trim(),
        description: joi.string().required().trim(),
    })
}

const getProduct = {
    body: joi.object().keys()
}

const deleteProduct = {
    params: joi.object().keys()
}

const updateProduct = {
    params: joi.object().keys()
}

module.exports = {
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct
}