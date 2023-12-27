let express = require('express')

const app = express()

// app.use(express.json()) // for parsing application/json

let institutes = [
    {
        "id": 2,
        "name": "ABC IT institute",
        "seat": [
            {
                "react": 15,
                "node": 20,
                "full_stack": 10,
                "ui_ux": 0
            }
        ]
    },
    {
        "id": 3,
        "name": "PQR IT institute",
        "seat": [
            {
                "react": 50,
                "node": 30,
                "full_stack": 0,
                "ui_ux": 5
            }
        ]
    },
    {
        "id": 4,
        "name": "LNM IT institute",
        "seat": [
            {
                "react": 2,
                "node": 0,
                "full_stack": 30,
                "ui_ux": 10
            }
        ]
    },
    {
        "id": 6,
        "name": "Khanak IT institute",
        "seat": [
            {
                "node": 15,
                "full_stack": 700,
                "ui_ux": 0
            }
        ]
    },
    {
        "id": 7,
        "name": "VFT IT institute",
        "seat": [
            {
                "node": 0,
                "full_stack": 0,
                "ui_ux": 0,
                "react": 0
            }
        ]
    }
]
app.get('/', (req, res) => {
    let fData = institutes.map((v) => {
        return {
            id: v.id,
            name: v.name,
            seat: v.seat.map((v) => Object.fromEntries(Object.entries(v).filter(([key, val]) => val > 0)))
        }
    })
        .filter((v) => Object.keys(v.seat[0]).length > 0)

    // express.
    res.status(200).json(res.send(fData))
})

app.post('/', (req, res) => {
    const data = req.body;

    let ans = Object.entries(data.seat[0]).filter(([key, val]) => val > 0)

    if (ans.length) {
        institutes.push(data)
        res.status(200).json({ message: 'Institutes added successfully!' })
    } else {
        res.status(400).json({ message: 'Institute not added due to not vacant seat' })
    }

})

app.put('/', (req, res) => {
    let id = req.query.id
    let body = req.body

    let index = institutes.findIndex((v) => v.id == id)

    if (index !== -1) {
        institutes[index] = body
        res.status(200).json({message: "Institute data updated!!"})
    } else {
        res.status(404).json({ message: "Data not found" });
    }
})

// app.delete('/',(req,res) => {
//     let id = req.query.id

//     let data = institutes.filter((v) => v.id != id)
//     if (data) {
//         institutes = data
//         res.status(200).json({message:'Data deleted Successfuly'})
//     } else {
//         res.status(404).json({message:"Not Found"})
//     }
// })

app.delete('/:instituteId/:courseKey', (req,res) => {
    const instId = parseInt(req.params.instituteId)
    const courseKey = req.params.courseKey

    const fInstitute = institutes.find((v) => v.id === instId)
    
    if (fInstitute) {
        if (fInstitute.seat[0].hasOwnProperty(courseKey)) {
            delete fInstitute.seat[0][courseKey]
            
            res.status(200).json({message: `Key ${courseKey} deleted successfully`})
        } else {
            res.status(404).json({message: `The key ${courseKey} is not in the database`})
        }
    } else {
        res.status(404).json({message: 'Institute not found'})
    }
})

app.listen(3000, () => {
    console.log('Server started at port 3000');
})