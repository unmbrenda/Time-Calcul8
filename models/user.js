module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        defaultValue: 1000
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
    });
    User.associate = function(models){
        User.hasMany(models.TimeSheet, {
            onDelete: 'cascade'
        });
        User.hasOne(models.Position)
    }
    return User;
  };