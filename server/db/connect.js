const mysql = require('mysql')

let pool = mysql.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    timezone: 'Asia/Shanghai',
    dateStrings : true
})


let db = {};

/**
 * @param query SQL statements
 * @param values{*[]}
 * find:
 * let sql =`SELECT * FROM User WHERE username = ? and password = ?`
 * let result = await db.query(sql,[username,password])
 * insert:
 * let sql = `INSERT INTO User(username,password) VALUES (?,?)`
 * let result = await db.query(sql,[username,password])
 * update:
 * let sql = `UPDATE User SET password = ? WHERE username = ?`
 * let result = await db.query(sql,[password,username])
 * delete:
 * let sql = `DELETE FROM User WHERE username = ?`
 * let result = await db.query(sql,[username])
 * @return {Promise<*[]>}
 */
db.query = (query, values) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        })
    })
}

module.exports = db;
