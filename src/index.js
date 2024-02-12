let express = require('express')
let dotenv = require('dotenv')
const app = express()
const routes = require('./routes/v1/index')
const connectDB = require('./db')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require("cors");
const passport = require('passport')
const session = require('express-session')
const { connectPassport, connectFacebook } = require('./utils/passport')
const connetcSocket = require('./utils/socket.io')

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

dotenv.config()

connectDB()
connetcSocket()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser())
app.use(express.json()) // for parsing application/json

app.use(session({
    secret: 'sdvfsdghbsdfmjhkrthr',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

connectPassport()
connectFacebook()

app.use('/v1', routes)
app.set('view engine', 'ejs')

// let institutes = [
//     {
//         "id": 2,
//         "name": "ABC IT institute",
//         "seat": [
//             {
//                 "react": 15,
//                 "node": 20,
//                 "full_stack": 10,
//                 "ui_ux": 0
//             }
//         ]
//     },
//     {
//         "id": 3,
//         "name": "PQR IT institute",
//         "seat": [
//             {
//                 "react": 50,
//                 "node": 30,
//                 "full_stack": 0,
//                 "ui_ux": 5
//             }
//         ]
//     },
//     {
//         "id": 4,
//         "name": "LNM IT institute",
//         "seat": [
//             {
//                 "react": 2,
//                 "node": 0,
//                 "full_stack": 30,
//                 "ui_ux": 10
//             }
//         ]
//     },
//     {
//         "id": 6,
//         "name": "Khanak IT institute",
//         "seat": [
//             {
//                 "node": 15,
//                 "full_stack": 700,
//                 "ui_ux": 0
//             }
//         ]
//     },
//     {
//         "id": 7,
//         "name": "VFT IT institute",
//         "seat": [
//             {
//                 "node": 0,
//                 "full_stack": 0,
//                 "ui_ux": 0,
//                 "react": 0
//             }
//         ]
//     }
// ]

app.get('/', (req, res) => {
    res.render('index', { text: 'OK' })
    // res.download('./src/index.js')

    // let fData = institutes.map((v) => {
    //     return {
    //         id: v.id,
    //         name: v.name,
    //         seat: v.seat.map((v) => Object.fromEntries(Object.entries(v).filter(([key, val]) => val > 0)))
    //     }
    // })
    //     .filter((v) => Object.keys(v.seat[0]).length > 0)

    // express.
    // res.status(200).json(res.send(fData))
})

// app.post('/', (req, res) => {
//     const data = req.body;

//     let ans = Object.entries(data.seat[0]).filter(([key, val]) => val > 0)

//     if (ans.length) {
//         institutes.push(data)
//         res.status(200).json({ message: 'Institutes added successfully!' })
//     } else {
//         res.status(400).json({ message: 'Institute not added due to not vacant seat' })
//     }

// })

// app.put('/', (req, res) => {
//     let id = req.query.id
//     let body = req.body

//     let index = institutes.findIndex((v) => v.id == id)

//     if (index !== -1) {
//         institutes[index] = body
//         res.status(200).json({message: "Institute data updated!!"})
//     } else {
//         res.status(404).json({ message: "Data not found" });
//     }
// })

// // app.delete('/',(req,res) => {
// //     let id = req.query.id

// //     let data = institutes.filter((v) => v.id != id)
// //     if (data) {
// //         institutes = data
// //         res.status(200).json({message:'Data deleted Successfuly'})
// //     } else {
// //         res.status(404).json({message:"Not Found"})
// //     }
// // })

// app.delete('/:instituteId/:courseKey', (req,res) => {
//     const instId = parseInt(req.params.instituteId)
//     const courseKey = req.params.courseKey

//     const fInstitute = institutes.find((v) => v.id === instId)

//     if (fInstitute) {
//         if (fInstitute.seat[0].hasOwnProperty(courseKey)) {
//             delete fInstitute.seat[0][courseKey]

//             res.status(200).json({message: `Key ${courseKey} deleted successfully`})
//         } else {
//             res.status(404).json({message: `The key ${courseKey} is not in the database`})
//         }
//     } else {
//         res.status(404).json({message: 'Institute not found'})
//     }
// })

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send({ message: err.message })
    } else {
        next()
    }
})


app.listen(5000, () => {
    console.log('Server started at port 5000');
})

// 5X675E2B26GLFHMKALZBMHFN