const MYSQL = require('mysql2')

class MYSQLDB {
    constructor(props) {
        this.connection = MYSQL.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'demo',
        })

        this.connection.connect((error) => {
            if (error) {
                // throw new Error(error)
            }

            console.log('MYSQL Database connected');
        })
            
    }

    query(sql, values) {
        new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

const db = new MYSQLDB()
module.exports = db;