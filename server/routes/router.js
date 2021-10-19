const Router = require('koa-router');
const router = new Router();

const user = require('./user')
router.use('/apis/user',user)

module.exports = router;
