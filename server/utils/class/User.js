const db = require('../../db/connect')
const {genHash, compareHash} = require('../bcryptUtils')
const SnowflakeID = require('../SnowflakeID')

class User {
    constructor(props) {
        this.username = props.username
        this.password = props.password
        this.pid = props.pid
    }

    async isNewUser() {
        let sql = `SELECT StudentID FROM UserInfo WHERE StudentName = ?`
        let result = await db.query(sql, [this.username])
        return result.length === 0;
    }

    async addNewUser() {
        let password = await genHash(this.password)
        let studentID = new SnowflakeID({
            mid: +new Date()
        });
        studentID = studentID.generate()
        let sql = `INSERT INTO UserInfo(StudentID,StudentName,StudentPassword) VALUES (?,?,?)`
        await db.query(sql, [studentID, this.username, password])
    }

    async checkPass() {
        let sql = `SELECT StudentPassword FROM UserInfo WHERE StudentName = ?`
        let hash = await db.query(sql, [this.username])
        if (hash.length === 0) {
            return false
        }
        return compareHash(this.password, hash[0]['StudentPassword'])
    }

    async updatePID() {
        let sql = `UPDATE UserInfo SET PlatformID = ? WHERE StudentName = ?`
        await db.query(sql, [this.pid, this.username])
    }

    async getPID() {
        let sql = `SELECT PlatformID from UserInfo WHERE StudentName = ?`
        return await db.query(sql,[this.username])
    }
}

module.exports = User
