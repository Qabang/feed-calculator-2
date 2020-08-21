module.exports = (connection, DataTypes) =>{
    return connection.define('ration', {
        rationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          rationAmount: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          rationTs: {
              type: DataTypes.INTEGER,
              allowNull:true
          },
          rationMj: {
              type: DataTypes.INTEGER,
              allowNull:true
          },
          rationSmrp: {
              type: DataTypes.INTEGER,
              allowNull:true
          },
          rationCa: {
              type: DataTypes.INTEGER,
              allowNull:true
          },
          rationP: {
              type: DataTypes.INTEGER,
              allowNull:true
          },
          rationMg: {
              type: DataTypes.INTEGER,
              allowNull:true
          },
          rationSelenium: {
              type: DataTypes.INTEGER,
              allowNull:true
          }

    })
}