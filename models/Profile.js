module.exports = (connection, DataTypes) =>{
    return connection.define('profile', {
        profileId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          profileName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique:true
          },
          profileBorn: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          profileGender: {
              type: DataTypes.STRING(15),
              allowNull:false
          },
          profileWeight: {
              type: DataTypes.INTEGER,
              allowNull:false
          },
          profileType: {
              type: DataTypes.STRING(10),
              allowNull:false
          },
          profileLook: {
              type: DataTypes.STRING(10),
              allowNull:false
          },
          profileWalk: {
              type: DataTypes.INTEGER,
              allowNull:true
          },
          profileTrotCanter: {
              type: DataTypes.INTEGER,
              allowNull:true
          }
    })
}