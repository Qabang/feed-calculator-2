const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.urlencoded())
// app.use(express.static('assets'))
app.use(express.static(__dirname + '/assets'))
app.use(require('./routes'))

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: require('./handlebars-helpers'),
  })
)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/views'))

app.listen(3000, () => {
  console.log('Server up and running!')
})
