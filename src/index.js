require('dotenv').config()

const ipControl = (settings = {}) => {
    let whitelist = process.env.EXPRESSJS_IP_WHITELIST || ''
    let blacklist = process.env.EXPRESSJS_IP_BLACKLIST || ''

    if (settings.whitelist) {
        whitelist = settings.whitelist
    }

    if (settings.blacklist) {
        blacklist = settings.blacklist
    }

    return (req, res, next) => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

        const forbidden = () => {
            return settings.forbidden ? settings.forbidden(req, res, ip) : res.status(403).send('You do not have rights to visit this page')
        }

        if (settings.exception && settings.exception()) {
            return next()
        }

        if (blacklist && blacklist.indexOf(ip) !== -1) {
            return forbidden()
        }

        if (whitelist && whitelist.indexOf(ip) === -1) {
            return forbidden()
        }

        return next();
    }
}
module.exports = ipControl;
