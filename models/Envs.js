module.exports = function (sequelize, DataTypes) {
    var Envs = sequelize.define("Envs", {
        projName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        envName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        envValue: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return Envs;
};
