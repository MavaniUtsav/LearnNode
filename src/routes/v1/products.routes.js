const express = require('express')

const router = express.Router()

router.get('/',(req,res) => {
    res.send('Get products api')
})

router.post('/',(req,res) => {
    res.send('Post products api')
})

module.exports = router