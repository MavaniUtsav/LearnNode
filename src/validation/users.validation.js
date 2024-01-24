const joi = require('joi')

const registerUser = {
    body: joi.object().keys({
        name: joi.string().trim().required(),
        address: joi.string().trim().required(),
        email: joi.string().email().required(),
        mobile_no: joi.number().required(),
        password: joi.string().required(),
        role: joi.string().trim(),
        refresh_token: joi.string(),
    })
}

const loginUser = {
    body: joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
    })
}
module.exports = {
    registerUser,
    loginUser
}