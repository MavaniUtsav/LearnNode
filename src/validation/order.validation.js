const Joi = require('joi')

const createorder = {
    body: Joi.object().keys({
        CNAME: Joi.string().required(),
        CITY: Joi.string().required(),
        RATING: Joi.number().required(),
        SNUM: Joi.number().required()
    })
}

module.exports = {
    createorder
}