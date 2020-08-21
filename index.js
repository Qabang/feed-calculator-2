const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(express.static('assets'))
app.use(require('./routes'))

app.engine('handlebars', exphbs(
  {
    defaultLayout: 'main',
    helpers: require('./handlebars-helpers')
  }
))
app.set('view engine', 'handlebars')

app.listen(3000, () => {
  console.log('Server up and running!')
})