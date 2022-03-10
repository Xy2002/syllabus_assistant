const axios = require('axios');
const FormData = require('form-data');
const data = new FormData();
const to = require('await-to-js').default

async function tgPush(chat_id, text) {
    data.append('chat_id', chat_id);
    data.append('text', text);

    const config = {
        method: 'post',
        url: `https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`,
        headers: {
            ...data.getHeaders()
        },
        data: data
    };

    let [res, err] = await to(axios(config))
    if (err) {
        throw new Error(err.message)
    }
    return res
}

module.exports=tgPush
