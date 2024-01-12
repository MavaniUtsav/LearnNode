const Variant = require("../model/variant.model")

const createVariant = (reqBody) => {
    return Variant.create(reqBody)
}

const getVariant = () => {
    return Variant.find()
}

const getVariantById = (reqId) => {
    return Variant.findById(reqId)
}

const deleteVariant = (reqId) => {
    return Variant.findByIdAndDelete(reqId)
}

const updateVariant = (reqId,reqBody) => {
    return Variant.findByIdAndUpdate(reqId,reqBody)
}

module.exports = {
    createVariant,
    getVariant,
    deleteVariant,
    updateVariant,
    getVariantById
}