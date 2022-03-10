const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')
const privateKey = fs.readFileSync(path.resolve('./key/rsa-private-key.pem'))
const publicKey = fs.readFileSync(path.resolve('./key/rsa-public-key.pem'))

function generateToken(StudentName) {
    let payload = {StudentName}
    if (StudentName) {
        return jwt.sign(payload, privateKey, {expiresIn: '31 days', algorithm: 'RS256'})
    } else {
        throw new Error("openId is null")
    }
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, (error, decoded) => {
            if (error) {
                reject(error.message)
            }
            resolve(decoded)

        })
    })
}

module.exports = {generateToken,verifyToken}
