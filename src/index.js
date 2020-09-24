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
        let ip = req.connection.remoteAddress

        if (settings.x_forwarded_for || process.env.EXPRESSJS_IP_X_FORWARDED_FOR === 'true') {
            ip = req.headers['x-forwarded-for']
        }


        const forbidden = () => {
            return settings.forbidden ? settings.forbidden(req, res, ip) : res.status(403).send('You do not have rights to visit this page')
        }

        if (settings.exception && settings.exception(req, res, ip)) {
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
