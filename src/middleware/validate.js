const Joi = require("joi")
const pick = require("../helper/pick")

const validate = (schema) => (req, res, next) => {
    const object = pick(req, Object.keys(schema))

    const { error, value } = Joi.compile(schema)
        .prefs({
            abortEarly: false,
            errors: { label: 'key' }
        })
        .validate(object)

    if (error) {
        const errors = error.details.map((v) => v.message).join(",")

        return next(new Error("Validation Error: " + errors))
    }

    Object.assign(req, value);

    return next();
}

module.exports = validate