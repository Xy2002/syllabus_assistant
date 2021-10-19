const sendHandle = () => {
    const render = ctx => {
        return (detail, desc = ctx.i18n.__('reqOK')) => {
            ctx.set('Content-Type', 'application/json');
            ctx.body = {
                code: '200',
                detail,
                desc
            }
        }
    }

    const loginRender = ctx => {
        return (token, desc = ctx.i18n.__('loginOK')) => {
            ctx.set('Content-Type', 'application/json');
            // day x hour x min x sec x ms
            ctx.cookies.set('jwt',token,{
                maxAge:  60 * 60 * 1000
            })
            ctx.body = {
                code: 200,
                desc
            }
        }
    }

    const loginRenderError = ctx => {
        return (code,desc=ctx.i18n.__('loginFail'),reason)=>{
            ctx.set('Content-Type', 'application/json');
            ctx.body = {
                code,
                desc,
                reason
            }
        }
    }

    const renderError = ctx => {
        return (code, desc = ctx.i18n.__('reqFail'),reason) => {
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
