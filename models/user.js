module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
          type: DataTypes.STRING(32),
          allowNull: false
      },
      last_name: {
          type: DataTypes.STRING(32),
          allowNull: false
        },
      email: {
          type: DataTypes.STRING(255),
          allowNull: false
      },
      password: {
          type: DataTypes.TEXT,
          allowNull: false
      } 
    }, {
        initialAutoIncrement: 10000
    });
    User.associate = function(models){
        User.hasMany(models.TimeSheet, {
            onDelete: 'cascade'
        })
    }
    return User;
  };