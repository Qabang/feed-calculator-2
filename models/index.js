const Sequelize = require('sequelize')
const fs = require('fs')

const connection = new Sequelize('feed_calculator', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    charset: "utf8mb4",
  },
  logging: () => {},
  operatorsAliases: 0
})

const models ={}
let files = fs.readdirSync(__dirname)
//read all files in the models directory. remove the index.js file and remove the .js from rest
files = files.filter(file => file !== 'index.js').map(file =>file.replace('.js',''))

files.forEach(file=>{
    models[file]=connection.import(file)
})

models.Ration.belongsTo(models.Profile, { foreignKey: 'profileId' })
// connection.authenticate().then(_ => {
//   console.log('Successfully connected to DB! :)')
// }).catch(error => {
//   console.log('Could not connect to DB. Reason: ', error)
// })

// connection.sync({ force: true }).then(_ => {
//   console.log('Database synchronized!')
// })

module.exports = models