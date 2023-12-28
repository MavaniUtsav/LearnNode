const express = require('express')

const router = express.Router()

let visitCount = 0;

const countVisit = (req,res,next) => {
    visitCount++;
    next()
}

router.route('/')
    .all(countVisit)
    .get((req, res) => {
        res.send('Get Users api ' + "called " + visitCount + " times")
    })
    .post((req, res) => {
        res.send('Post Users api')
    })
    .put((req, res) => {
        res.send('Put Users api')
    })
    .delete((req, res) => {
        res.send('Delete Users api')
    })

router.get('/new', (req, res) => {
    res.send(`Get new users api`)
})

router.get('/:id', (req, res) => {
    res.send(`Get users api ${req.params.id}`)
})

// router.get('/',countVisit,(req, res) => {
//     res.send('Get Users api ' + "called " + visitCount + " times")
// })

// router.post('/', (req, res) => {
//     res.send('Post Users api')
// })

// router.put('/', (req, res) => {
//     res.send('Put Users api')
// })

// router.delete('/', (req, res) => {
//     res.send('Delete Users api')
// })

module.exports = router