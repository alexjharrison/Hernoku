module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      key: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
    return User;
  };
  