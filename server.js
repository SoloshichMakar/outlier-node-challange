const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes/routes')

const port = process.env.PORT || 1337

const app = express()

module.exports = app

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.use('/', routes)

app.listen(port, function () {
  console.log('Running Nodejs app on port ' + port)
})
