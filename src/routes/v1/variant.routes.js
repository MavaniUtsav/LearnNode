const express = require('express')
const validate = require('../../middleware/validate')
const { variantValidation } = require('../../validation')
const { variantController } = require('../../controller')

const router = express.Router()

router.get(
    '/get-variant',
    validate(variantValidation.getVariant),
    variantController.getVariant
)

router.get(
    '/get-variant/:id',
    validate(variantValidation.getVariant),
    variantController.getVariantById
)

router.post(
    '/list-variant',
    validate(variantValidation.createVariant),
    variantController.createVariant
)

router.put(
    '/update-variant/:id',
    validate(variantValidation.updateVariant),
    variantController.updateVariant
)

router.delete(
    '/delete-variant/:id',
    validate(variantValidation.deleteVariant),
    variantController.deleteVariant
)
module.exports = router