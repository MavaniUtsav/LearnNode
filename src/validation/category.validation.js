
const joi = require('joi')

const createCategory = {
    body: joi.object().keys({
        category_name: joi.string().required().trim(),
        category_description: joi.string().required().trim()
    })
}

const getCategory = {
    body: joi.object().keys()
}

const deleteCategory = {
    params: joi.object().keys()
}

const updateCategory = {
    params: joi.object().keys()
}

module.exports = {
    createCategory,
    getCategory,
    deleteCategory,
    updateCategory
}