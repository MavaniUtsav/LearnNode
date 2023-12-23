let data = [
    {
        name: 'ABC IT institute',
        seat: [
            {
                react: 15,
                node: 20,
                full_stack: 10,
                ui_ux: 0
            }
        ]
    },
    {
        name: 'XYZ IT institute',
        seat: [
            {
                react: 0,
                node: 70,
                full_stack: 0,
                ui_ux: 10
            }
        ]
    },
    {
        name: 'PQR IT institute',
        seat: [
            {
                react: 50,
                node: 30,
                full_stack: 0,
                ui_ux: 5
            }
        ]
    },
    {
        name: 'LNM IT institute',
        seat: [
            {
                react: 2,
                node: 0,
                full_stack: 30,
                ui_ux: 10
            }]
    },
    {
        name: 'QYP IT institute',
        seat: [
            {
                react: 0,
                node: 15,
                full_stack: 10,
                ui_ux: 0
            }
        ]
    },
]

let newData;
let arr
newData = data.map((institute) => {
    // console.log(v)
    institute.seat.forEach((v,i) => {
        arr = Object.entries(v).filter((v) => v[1] > 0)
    })
    institute.seat = Object.fromEntries(arr);
    return institute
})

// let newData = data.filter(institute => {
//     // Check if every seat property has a positive value
//     return institute.seat.every(seat => Object.values(seat).every(value => value > 0));
// });

console.log(newData);