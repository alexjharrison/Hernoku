module.exports = function(sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
      author: {
        type: DataTypes.TEXT,
        allowNull: false
      },
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
      stack: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      gitLink: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      public: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    });
    return Project;
  };
  