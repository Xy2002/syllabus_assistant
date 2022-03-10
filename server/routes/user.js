const Router = require('koa-router')
const {generateToken, verifyToken} = require('../utils/token')
const router = new Router();
const {logger} = require('../middlewares/logger')

const User = require('../utils/class/User')
const {default: to} = require("await-to-js");
/**
 * user login
 * Determine if it is the first level of login
 */
router.post('/register', async (ctx) => {
    let req = ctx.request.body
    const user = new User(req)
    try {
        if (!await user.isNewUser()) {
            return ctx.sendError('401', ctx.i18n.__('registered'))
        }
        await user.addNewUser()
        return ctx.send('Register successfully')
    } catch (err) {
        logger.error(err)
        return ctx.sendError('400', err.message)
    }
})

router.post('/login', async (ctx) => {
    let req = ctx.request.body
    const user = new User(req)
    try {
        let bool = await user.checkPass()
        if (bool) {
            return ctx.loginSend(generateToken(req.username))
        } else {
            return ctx.loginSendError()
        }
    } catch (err) {
        logger.error(err)
        return ctx.sendError('400', err)
    }
})

router.get('/getPID', async (ctx) => {
    let obj = ctx.request.body
    let token = ctx.request.header['x-cookie']
    // let token = ctx.cookies.get('jwt')
    const [err, res] = await to(verifyToken(token))
    if (!token || err) {
        return ctx.sendError(401, ctx.i18n.__('unknownToken'))
    }
    try {
        obj.username = res.StudentName
        let user = new User(obj)
        return ctx.send(await user.getPID())
    } catch (e) {
        logger.error(e)
        return ctx.sendError(400, e.message)
    }
})

router.post('/updatePID', async (ctx) => {
    let obj = ctx.request.body
    let token = ctx.request.header['x-cookie']
    // let token = ctx.cookies.get('jwt')
    const [err, res] = await to(verifyToken(token))
    if (!token || err) {
        return ctx.sendError(401, ctx.i18n.__('unknownToken'))
    }
    try {
        obj.username = res.StudentName
        let user = new User(obj)
        console.log(await user.updatePID())
        return ctx.send('success')
    } catch (e) {
        logger.error(e)
        return ctx.sendError(400, e.message)
    }
})
module.exports = router.routes()
