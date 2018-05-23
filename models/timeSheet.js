module.exports = function(sequelize, DataTypes) {
    var TimeSheet = sequelize.define("TimeSheet", {
      punch_code: {
          type: DataTypes.ENUM('clockIn', 'clockOut'),
          allowNull: false
      }  
    });
    
    return TimeSheet;
  };