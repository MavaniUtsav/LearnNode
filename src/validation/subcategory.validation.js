const joi = require('joi')

const createSubcategory = {
    body: joi.object().keys(
        {
            category_id: joi.string().required(),
            subcategory_name: joi.string().required().trim(),
            subcategory_description: joi.string().required().trim()
        }
    )
}

const getSubcategory = {
    body: joi.object().keys()
}

const deleteSubcategory = {
    params: joi.object().keys()
}

const updateSubcategory = {
    // params: joi.object().keys({ id: joi.number().integer() })
    params: joi.object().keys()
}

module.exports = {
    createSubcategory,
    getSubcategory,
    deleteSubcategory,
    updateSubcategory
}