const Router = require('koa-router');
const router = new Router();

const schedule = require('./schedule')
const user = require('./user')
router.use('/apis/user',user)
router.use('/apis/schedule',schedule)
module.exports = router;
