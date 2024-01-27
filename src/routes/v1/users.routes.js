const express = require('express')
const zod = require('zod');
const { UserValidation } = require('../../validation');
const { userController } = require('../../controller');
const validate = require('../../middleware/validate');
const authMiddleware = require('../../middleware/auth');

const router = express.Router()

// let visitCount = 0;

// const countVisit = (req, res, next) => {
//     visitCount++;
//     next()
// }

// const Data = [
//     {
//         id: 1,
//         name: 'John Doe',
//     },
//     {
//         id: 2,
//         name: 'Jane Smith'
//     }
// ]

// const userSchema = zod.object({
//     id: zod.number(),
//     name: zod.string().min(2),
//     age: zod.number().gt(18),
//     hobbies: zod.array(zod.string()),
//     country: zod.literal('IN').or(zod.literal('CA')).or(zod.literal('US')),
// })

router.post(
    '/register',
    validate(UserValidation.registerUser),
    userController.registerUser
)

router.post(
    '/login',
    validate(UserValidation.loginUser),
    userController.loginUser
)

router.post(
    '/generateNewTokens',
    userController.generateNewTokens
)

// router.get(
//     '/protected-route',
//     authMiddleware,
//     (req, res) => {
//         res.json({
//             message: "You are in the protected route",
//             user: "User Data"
//         })
//     }
// )


// router.get('/:id', (req, res) => {
//     res.send(`Get users api ${req.user.name}`)
// })

// router.param("id", (req, res, next, id) => {
//     let fData = Data.find((v) => v.id === parseInt(id))
//     req.user = fData
    
//     next();
// });


// router.route('/')
//     .all(countVisit)
//     .get((req, res) => {
//         res.send('Get Users api ' + "called " + visitCount + " times")
//     })
//     .post((req, res) => {
//         res.send('Post Users api')
//     })
//     .put((req, res) => {
//         res.send('Put Users api')
//     })
//     .delete((req, res) => {
//         res.send('Delete Users api')
//     })

// router.get('/new', (req, res) => {
//     res.send(`Get new users api`)
// })

// router.get('/:name',(req,res) => {
//     res.send(`Get users api ${req.params.name}`)
// })


// router.get('/',countVisit,(req, res) => {
//     res.send('Get Users api ' + "called " + visitCount + " times")
// })

// router.post('/', (req, res) => {
//     const response = userSchema.safeParse(req.body)
//     res.json(response)
//     // console.log(response);
//     // res.send(response)
// })

// router.put('/', (req, res) => {
//     res.send('Put Users api')
// })

// router.delete('/', (req, res) => {
//     res.send('Delete Users api')
// })



module.exports = router