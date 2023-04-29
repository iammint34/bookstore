const EXPRESS = require('express')
const cors = require('cors')
const moment = require('moment-timezone')

const app = new EXPRESS()
const routes = require('@config/routes')
moment.tz.setDefault('Asia/Manila')


app.use(cors({
    origin: '*'
}))
app.use(EXPRESS.json({ limit: '100mb' }));
app.use(EXPRESS.urlencoded({ extended: false }))

// Register all routes
routes.forEach(route => {
    app.use(route)
})

app.use(require('@middlewares/error-handler'))

module.exports = app