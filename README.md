# expressjs-ip-control

> React Form Generator

[![NPM](https://img.shields.io/npm/v/expressjs-ip-control.svg)](https://www.npmjs.com/package/expressjs-ip-control) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


Expressjs package to whitelist IP addresses also support for X-Forwarded-For ip addresses.

## Install

```bash
npm install --save expressjs-ip-control
```

## Usage

```jsx
const ipControl = require('expressjs-ip-control')

// Default IP control with a whitelist
app.get('/', ipControl({
    whitelist: '127.0.0.1, 192.168.10.10',
}), (req, res) => res.send('Hello World!'))

// Add your own custom method for when an IP address is forbidden.
app.get('/', ipControl({
    forbidden: (req, res, ip) => {
        return res.status(403).send('You do not have rights!')
    },
}), (req, res) => res.send('Hello World!'))

// Add your own logic to the IP check you can make exceptions to let the IP address pass.
// For example pass all IP addresses for a non production environment.
app.get('/', ipControl({
    exception: (req, res, ip) => {
        return proccess.env.production !== 'production'
    }
}), (req, res) => res.send('Hello World!'))

// Enable IP check on X-Forwarded-For header.
// Warning you should only use this if you are sure the X-Forwarded-For header cannot be set:
// curl --header "X-Forwarded-For: 192.168.0.2" http://example.com
// I used this in combination with Nginx port forwarding which always sets the X-Forwarded-For with the remote IP adres:
// proxy_set_header X-Forwarded-For $remote_addr;
app.get('/', ipControl({
    x_forwarded_for: true,
}), (req, res) => res.send('Hello World!'))

```

## Config

Optionally you can create a .env file an add your whitelist:

``
EXPRESSJS_IP_WHITELIST="127.0.0.1, 192.168.10.10"
EXPRESSJS_IP_X_FORWARDED_FOR=true
``

```jsx
const ipControl = require('expressjs-ip-control')

// Uses whitelist from .env
app.get('/', ipControl(), (req, res) => res.send('Hello World!'))

// You can still override .env whitelist by the whitelist setting:
app.get('/', ipControl({
    whitelist: '127.0.0.1, 192.168.10.10',
}), (req, res) => res.send('Hello World!'))

```

## License

MIT © [tychovbh](https://github.com/tychovbh)
