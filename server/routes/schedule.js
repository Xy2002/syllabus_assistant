const Router = require('koa-router')
const {verifyToken} = require('../utils/token')
const router = new Router();
const {logger} = require('../middlewares/logger')
const to = require('await-to-js').default
const Schedule = require('../utils/class/Schedule')
router.post('/addSchedule', async (ctx) => {
    let obj = ctx.request.body
    // let token = ctx.cookies.get('jwt')
    let token = ctx.request.header['x-cookie']

    const [err, res] = await to(verifyToken(token))
    if (!token || err) {
        return ctx.sendError(401, ctx.i18n.__('unknownToken'))
    }
    try {
        obj.StudentName = res.StudentName
        let schedule = new Schedule(obj)
        await schedule.addSchedule()
        return ctx.send('ok')
    } catch (e) {
        logger.error(e)
        return ctx.sendError(400, e.message)
    }
})

router.get('/getSchedule', async (ctx) => {
    let obj = ctx.request.body
    let token = ctx.request.header['x-cookie']
    // let token = ctx.cookies.get('jwt')
    const [err, res] = await to(verifyToken(token))
    if (!token || err) {
        return ctx.sendError(401, ctx.i18n.__('unknownToken'))
    }
    try {
        obj.StudentName = res.StudentName
        let schedule = new Schedule(obj)
        return ctx.send(await schedule.getScheduleList())
    } catch (e) {
        logger.error(e)
        return ctx.sendError(400, e.message)
    }
})

router.post('/deleteSchedule', async (ctx) => {
    let obj = ctx.request.body
    let token = ctx.request.header['x-cookie']
    const [err, res] = await to(verifyToken(token))
    if (!token || err) {
        return ctx.sendError(401, ctx.i18n.__('unknownToken'))
    }
    try {
        obj.StudentName = res.StudentName
        let schedule = new Schedule(obj)
        return ctx.send(await schedule.deleteSchedule())
    } catch (e) {
        logger.error(e)
        return ctx.sendError(400, e.message)
    }
})
module.exports = router.routes()
