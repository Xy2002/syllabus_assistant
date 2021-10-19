const request = require('request');
const LOGIN_URL = require('../config/urlConfig').LOGIN_URL

/**
 * 获取ecampus的jwloginToken
 * @param {object}user 需要包含username和password
 * @returns {Promise<string>}jwloginToken 返回的string为jwloginToken
 */
function ecampusLogin(user) {
    function randomString(t) {
        t = t || 32;
        for (var e = "oOLlABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789.", n = e.length, l = "", i = 0; i < t; i++)
            l += e.charAt(Math.floor(Math.random() * n));
        return l
    }

    var l = randomString(10)
    var options = {
        'method': 'POST',
        'url':LOGIN_URL,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'username': user.username,
            'password': user.password,
            'rd': l
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            if(JSON.parse(response.body).msg !== false)
                resolve(JSON.parse(response.body).msg)
            else
                reject("账号密码错误")
        });
    })

}

module.exports = ecampusLogin

