// module.exports = (l,w,callback) => {
//     if (l <= 0 || w <= 0) {
//         callback(new Error('Value is in negative'), null);
//     } else {
//         callback(null,{
//             area: () => l*w,
//             perimeter: () => 2*(l+w),
//         })
//     }
// }

module.exports = (salary, callback) => {
    if (salary < 10000) {
        callback(null,salary*0.10)
    } else if (salary < 20000) {
        callback(null,salary*0.15)
    } else if (salary < 30000) {
        callback(null,salary*0.20)
    } else if (salary <= 0) {
        callback(new Error('Value is in negative'),null)
    }
}