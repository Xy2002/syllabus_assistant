const mysql = require('mysql')
const DB_CONFIG = require('../config/dbconf')
let pool = mysql.createPool(DB_CONFIG)

let db = {};

pool.on('connection',function (connection) {
    console.log(connection)
})

pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});

pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

//SELECT * FROM t_user WHERE username = "whg"
db.find = (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, results, fields) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        })
    })
}

//'INSERT INTO t_user(username, pass) VALUES(?, ?)'
//["lalla","bbbb"]
db.insert = (query, values) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        })
    })
}

//'DELETE FROM t_user  WHERE id = 1'
db.delete = (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        })
    })
}

//UPDATE t_user SET pass = "321" WHERE username = "whg"
db.update = (query) => {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        })
    })
}


module.exports = db;
