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

router.get(
    '/get-category/:id',
    validate(categoryValidation.getCategory),
    categoryController.getCategoryById
)

router.post(
    '/list-category',
    validate(categoryValidation.createCategory),
    categoryController.createCategory
)

router.put(
    '/update-category/:id',
    validate(categoryValidation.updateCategory),
    categoryController.updateCategory
)

router.delete(
    '/delete-category/:id',
    validate(categoryValidation.deleteCategory),
    categoryController.deleteCategory
)

module.exports = router