const SnowflakeID = require("../SnowflakeID");
const db = require("../../db/connect");

class Schedule {
    constructor(props) {
        this.ClassName = props.ClassName
        this.ClassTime = props.ClassTime
        this.ClassLocation = props.ClassLocation
        this.ClassID = props.ClassID
        this.StudentName = props.StudentName
    }

    async addSchedule() {
        let ClassID = new SnowflakeID({
            mid: +new Date()
        });
        ClassID = ClassID.generate()
        let sql = `INSERT INTO ClassSchedule(ClassID,ClassName,ClassTime,ClassLocation) VALUES (?,?,?,?)`
        await db.query(sql, [ClassID, this.ClassName, this.ClassTime, this.ClassLocation])

        sql = `SELECT ClassList FROM UserInfo WHERE StudentName = ?`
        let ClassList = await db.query(sql, [this.StudentName])
        let tempStr = ClassList[0]['ClassList']
        if (tempStr === null ) {
            tempStr = ''
        }
        /**
         *
         * @type {*[]}
         */
        let tempArr = []
        tempArr = tempStr.split(',')
        tempArr = tempArr.filter(d => d)
        tempArr.push(ClassID)
        tempStr = tempArr.join(',')
        sql = `UPDATE UserInfo SET ClassList = ? WHERE StudentName = ?`
        await db.query(sql, [tempStr, this.StudentName])
    }

    async getScheduleList() {
        let sql = `SELECT ClassList FROM UserInfo WHERE StudentName = ?`
        let result = await db.query(sql, [this.StudentName])
        let tempStr = result[0]['ClassList']
        let tempArr = tempStr.split(',')
        let scheduleArr = []
        for (const tempArrElement of tempArr) {
            let sql = `SELECT ClassID,ClassName,ClassTime,ClassLocation FROM ClassSchedule WHERE ClassID = ?`
            scheduleArr.push(await db.query(sql, [tempArrElement]))
        }
        return scheduleArr
    }

    async deleteSchedule() {
        let sql = `SELECT ClassList FROM UserInfo WHERE StudentName = ?`
        let ClassList = await db.query(sql, [this.StudentName])
        let tempStr = ClassList[0]['ClassList']
        let tempArr = tempStr.split(',')
        if (tempArr.indexOf(this.ClassID) !== -1) {
            tempArr.splice(tempArr.indexOf(this.ClassID),1)
            tempStr = tempArr.join(',')
            sql = `UPDATE UserInfo SET ClassList = ? WHERE StudentName = ?`
            await db.query(sql, [tempStr, this.StudentName])
        }
    }
}


module.exports = Schedule
