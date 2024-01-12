const express = require('express')
const validate = require('../../middleware/validate')
const { subCategoryValidation } = require('../../validation')
const { subCategoryController } = require('../../controller')


const router = express.Router()

router.post(
    '/list-subcategory',
    validate(subCategoryValidation.createSubcategory),
    subCategoryController.createSubCategory
)

router.get(
    '/get-subcategory',
    validate(subCategoryValidation.getSubcategory),
    subCategoryController.getSubCategory
)

router.get(
    '/get-subcategory/:id',
    validate(subCategoryValidation.getSubcategory),
    subCategoryController.getSubCategoryById
)

router.delete(
    '/delete-subcategory/:id',
    validate(subCategoryValidation.deleteSubcategory),
    subCategoryController.deleteSubCategory
)

router.put(
    '/update-subcategory/:id',
    validate(subCategoryValidation.updateSubcategory),
    subCategoryController.updateSubCategory
)

module.exports = router