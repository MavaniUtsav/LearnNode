
const joi = require('joi')

// const categoryValidation = {
//     createCategory: joi.object().keys({
// }

const createCategory = {
    body: joi.object().keys({
        category_name: joi.string().required().trim(),
        category_description: joi.string().required().trim()
    })
}

module.exports = {
    createCategory
}