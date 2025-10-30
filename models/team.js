"use strict";

module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT }
  }, {
    tableName: 'Teams',
    timestamps: true
  });

  Team.associate = (models) => {
    Team.belongsToMany(models.User, { through: models.UserTeam, foreignKey: 'teamId', otherKey: 'userId' });
    Team.hasMany(models.Project, { foreignKey: 'teamId' });
  };

  return Team;
};

