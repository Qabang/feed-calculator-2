const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('assets'))
app.use(require('./routes'))

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: require('./handlebars-helpers'),
  })
)
app.set('view engine', 'handlebars')

app.listen(3000, () => {
  console.log('Server up and running!')
})
