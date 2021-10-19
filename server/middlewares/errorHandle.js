const errorHandle = (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 200;
            return ctx.sendError('000004', ctx.i18n.__('noPermissions'));
        } else {
            throw err;
        }
    })
}

module.exports = errorHandle;
