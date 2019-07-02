const express = require('express')
const app = express()
const port = 3000
const ipControl = require('expressjs-ip-control')

app.get('/', ipControl(), (req, res) => res.send('Hello World!'))

app.get('/whitelist', ipControl({
    whitelist: '::1'
}), (req, res) => res.send('Hello World!'))

app.get('/blacklist', ipControl({
    blacklist: '::1'
}), (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port http://localhost${port}!`))
