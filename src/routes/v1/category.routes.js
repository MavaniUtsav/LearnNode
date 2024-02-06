const express = require('express');
const { categoryValidation } = require('../../validation');
const validate = require('../../middleware/validate');
const { createCategory, getCategory } = require('../../controller/category.controller');
const { categoryController } = require('../../controller');
const authMiddleware = require('../../middleware/auth');

const router = express.Router()

router.get(
    '/get-category',
    authMiddleware(['admin', 'seller']),
    // validate(categoryValidation.getCategory),
    categoryController.getCategory
    
)

router.get(
    '/get-category/:id',
    validate(categoryValidation.getCategory),
    categoryController.getCategoryById
)

router.post(
    '/create-category',
    validate(categoryValidation.createCategory),
    // authMiddleware(['admin', 'seller']),
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

router.get(
    '/count-active',
    validate(categoryValidation.getCategory),
    categoryController.countActive
)

router.get(
    '/most-products',
    validate(categoryValidation.getCategory),
    categoryController.mostProducts
)

router.get(
    '/average-products',
    validate(categoryValidation.getCategory),
    categoryController.averageProducts
)

router.get(
    '/inactive',
    validate(categoryValidation.getCategory),
    categoryController.countInActive
)

router.get(
    '/count-subcategories',
    validate(categoryValidation.getCategory),
    categoryController.countSubcategories
)


module.exports = router