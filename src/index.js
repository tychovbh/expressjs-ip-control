require('dotenv').config()

const ipControl = (settings = {}) => {
    let whitelist = process.env.EXPRESSJS_IP_WHITELIST || ''

    if (settings.whitelist) {
        whitelist = settings.whitelist
    }

    return (req, res, next) => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

        if (settings.exception && settings.exception()) {
            return next()
        }

        if (whitelist.indexOf(ip) === -1) {
            return settings.forbidden ? settings.forbidden(req, res, ip) : res.status(403).send('You do not have rights to visit this page')
        }

        return next();
    }
}
module.exports = ipControl;
