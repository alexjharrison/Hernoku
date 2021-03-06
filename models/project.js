module.exports = function(sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
      username: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      repoLink: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      repoName: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      fullStack: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      react: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      gitLink: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      hookLink: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      envs: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });
    return Project;
  };
  