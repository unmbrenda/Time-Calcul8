module.exports = function (sequelize, DataTypes) {
  let Position = sequelize.define('Position', {
    position_title: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  })
  Position.associate = function (models) {
    Position.hasMany(models.User, {
      foreignKey: {
        allowNull: false,
      }
    })
  }
  return Position;
}
