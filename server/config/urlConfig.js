/**
 * Considering that some schools do not adopt the https protocol,
 * but their own websites adopt the https protocol,
 * they will configure a reverse proxy.
 * This configuration allows you to send network requests directly to schools that adopt the https protocol when debugging locally,
 * and you need to send requests to addresses that have adopted the https protocol when going live.
 * @type {string}
 */
const SYLLABUS_ASSISTANT_API_DOMAIN = process.env.NODE_ENV === 'development' ? 'http://ecampus.nfu.edu.cn:2929' : 'https://tool.naiquoy.com/nfuApi';

/**
 * This variable configures the list of all interfaces that need to be requested from the school and can be changed as needed.
 * @type {{LOGIN_URL: string}}
 */
const SYLLABUS_ASSISTANT_API_LIST = {
    LOGIN_URL: SYLLABUS_ASSISTANT_API_DOMAIN+"/jw-privilegei/User/r-login",
}

module.exports = SYLLABUS_ASSISTANT_API_LIST
