module.exports = function(sequelize, DataTypes) {
    var TimeSheet = sequelize.define("TimeSheet", {
      date: {
          type: DataTypes.DATEONLY,
          allowNull: false
      },
      time_punch: {
          type: DataTypes.TIME,
          allowNull: false
        },
      punch_code: {
          type: DataTypes.ENUM('clockIn', 'clockOut'),
          allowNull: false
      }  
    });
    TimeSheet.associate = function(models){
        TimeSheet.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return TimeSheet;
  };