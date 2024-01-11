const express = require('express');
const { categoryValidation } = require('../../validation');
const validate = require('../../middleware/validate');
const { createCategory } = require('../../controller/category.controller');

const router = express.Router()

router.get('/', (req, res) => {
    console.log('Get Category API');
})

router.post(
    '/create-category',
    validate(categoryValidation.createCategory),
    createCategory
)

module.exports = router