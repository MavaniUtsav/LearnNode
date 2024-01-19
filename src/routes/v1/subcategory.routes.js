const express = require('express')
const validate = require('../../middleware/validate')
const { subCategoryValidation } = require('../../validation')
const { subCategoryController } = require('../../controller')


const router = express.Router()


router.get(
    '/list-subcategory',
    validate(subCategoryValidation.getSubcategory),
    subCategoryController.getSubCategory
)

router.get(
    '/get-subcategory/:id',
    validate(subCategoryValidation.getSubcategory),
    subCategoryController.getSubCategoryById
)

router.post(
    '/create-subcategory',
    validate(subCategoryValidation.createSubcategory),
    subCategoryController.createSubCategory
)

router.put(
    '/update-subcategory/:id',
    validate(subCategoryValidation.updateSubcategory),
    subCategoryController.updateSubCategory
)

router.delete(
    '/delete-subcategory/:id',
    validate(subCategoryValidation.deleteSubcategory),
    subCategoryController.deleteSubCategory
)

module.exports = router