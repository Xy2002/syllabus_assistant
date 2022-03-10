const sendHandle = () => {
    const render = ctx => {
        return (detail, desc = 'Request successful') => {
            ctx.set('Content-Type', 'application/json');
            ctx.body = {
                code: 200,
                detail,
                desc
            }
        }
    }

    const loginRender = ctx => {
        return (token, desc = 'Login Successful') => {
            ctx.set('Content-Type', 'application/json');
            // day x hour x min x sec x ms
            ctx.body = {
                code: 200,
                desc,
                token
            }
        }
    }

    const loginRenderError = ctx => {
        return (reason = ctx.i18n.__('wrongAccOrPass'), desc = ctx.i18n.__('loginFail')) => {
            ctx.set('Content-Type', 'application/json');
            ctx.body = {
                code: '000003',
                desc,
                reason
            }
        }
    }

    const renderError = ctx => {
        return (code, reason, desc = ctx.i18n.__('reqFail')) => {
            ctx.set('Content-Type', 'application/json');
            ctx.body = {
                code,
                desc,
                reason
            }
        }
    }

    return async (ctx, next) => {
        ctx.loginSend = loginRender(ctx);
        ctx.send = render(ctx);
        ctx.sendError = renderError(ctx);
        ctx.loginSendError = loginRenderError(ctx)
        await next();
    }
}

module.exports = sendHandle;
