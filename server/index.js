const koa = require('koa');
const koa_bodyparser = require('koa-bodyparser');
const cors = require('koa2-cors');
const path = require('path');
const http2 = require('http2')
const locale = require('koa-locale')
const i18n = require('koa-i18n')
const fs = require('fs')
const router = require('./routes/router.js')
const {logger, accessLogger} = require('./middlewares/logger');
require('dotenv').config()
const errorHandle = require('./middlewares/errorHandle.js'),
    sendHandle = require('./middlewares/sendHandle.js');


const app = new koa();
locale(app)
const options = {
    key: fs.readFileSync(path.resolve('./ssl/naiquoy.com.key')),
    cert: fs.readFileSync(path.resolve('./ssl/naiquoy.com.pem'))
}
app.use(cors())
app.use(koa_bodyparser())
app.use(sendHandle());
app.use(errorHandle);
app.use(i18n(app, {
    directory: './locales',
    locales: ['en'], //  `zh-CN` default Locale, must match the locales to the filenames
    modes: [
        'query',                //  optional detect querystring - `/?locale=en-US`
        'subdomain',            //  optional detect subdomain   - `zh-CN.koajs.com`
        'cookie',               //  optional detect cookie      - `Cookie: locale=zh-TW`
        'header',               //  optional detect header      - `Accept-Language: zh-CN,zh;q=0.5`
        'url',                  //  optional detect url         - `/en`
    ]
}))
app.use(accessLogger())
app.use(router.routes())
app.use(router.allowedMethods())
app.on('error', err => {
    logger.error(err)
})
app.listen(3000, () => {
    console.log("http server running success at 3000");
})

// http2.createSecureServer(options, app.callback()).listen(3000, () => {
//     console.log("http2 server running success at 3000")
// })
