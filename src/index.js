require('dotenv').config()

let defaultSettings = {
    whitelist: process.env.EXPRESSJS_IP_WHITELIST || ''
}

let settings = {}

const ipCheck = (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    if (defaultSettings.whitelist.indexOf(ip) === -1 || settings.exception && !settings.exception(req, res, ip)) {
        return settings.forbidden ? settings.forbidden(req, res, ip) : res.status(403).send('You do not have rights to visit this page')
    }

    return next();
}

const ipControl = (options = {}) => {
    settings = options

    if (options.whitelist) {
        defaultSettings.whitelist = options.whitelist
    }


    return ipCheck
}
module.exports = ipControl;
