const express = require('express');
const { categoryValidation } = require('../../validation');
const validate = require('../../middleware/validate');
const { createCategory, getCategory } = require('../../controller/category.controller');
const { categoryController } = require('../../controller');

const router = express.Router()

router.get(
    '/get-category',
    validate(categoryValidation.getCategory),
    categoryController.getCategory
)

router.post(
    '/create-category',
    validate(categoryValidation.createCategory),
    categoryController.createCategory
)

router.delete(
    '/delete-category/:id',
    validate(categoryValidation.deleteCategory),
    categoryController.deleteCategory
)

router.put(
    '/update-category',
    validate(categoryValidation.updateCategory),
    categoryController.updateCategory
)

module.exports = router