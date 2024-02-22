const db = require("../db/mysql")

const orders = async (sql,values) => {
    try {
        const result = db.query(sql, values)
        if (!result) {
            throw new Error('Query error')
        }

        return result
    } catch (error) {
        return error
    }
}

module.exports = {
    orders
}