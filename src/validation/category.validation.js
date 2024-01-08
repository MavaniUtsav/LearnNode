
const joi = require('joi')

// const categoryValidation = {
//     createCategory: joi.object().keys({
// }

const createCategory = {
    body: joi.object().keys({
        id: joi.number().required(),
        name: joi.string().required().trim(),
    })
}

module.exports = {
    createCategory
}