const express = require('express');
const { categoryValidation } = require('../../validation');
const validate = require('../../middleware/validate');
const { createCategory, getCategory } = require('../../controller/category.controller');

const router = express.Router()

router.get(
    '/create-category',
    getCategory
)

router.post(
    '/create-category',
    validate(categoryValidation.createCategory),
    createCategory
)

module.exports = router