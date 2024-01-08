const express = require('express');
const { categoryValidation } = require('../../validation');
const validate = require('../../middleware/validate');

const router = express.Router()

router.get('/',(req,res) => {
    console.log('Get Category API');
})

router.post('/',validate(categoryValidation.createCategory),(req,res) => {
    console.log('Post Category API' + req.body);
    res.status(200).json(req.body)
})

module.exports = router
