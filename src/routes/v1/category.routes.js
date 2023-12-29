const express = require('express');
const { categoryValidation } = require('../../validation');
const categoryValidate = require('../../middleware/validate');
const validate = require('../../middleware/validate');

const router = express.Router()

router.get('/',(req,res) => {
    console.log('Get Category API');
})

router.post('/',validate(categoryValidation.createCategory),(req,res) => {
    console.log('Post Category API');
})

module.exports = router
