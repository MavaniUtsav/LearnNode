let rect = require('./rectangle')
let os = require('os')

// const solveRect = (l, w) => {
//     rect(l, w, (err, rectangle) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(rectangle.area())
//             console.log(rectangle.perimeter())
//         }
//     })
// }

// solveRect(10, 20)

const solveBonus = (salary) => {
    rect(salary,(err, bonus) => {
        if (err) {
            console.log(err);
        } else {
            console.log(bonus);
        }
    })
}

solveBonus(990)