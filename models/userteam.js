"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserTeam = sequelize.define('UserTeam', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    teamId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'UserTeams',
    timestamps: true,
    indexes: [
      { unique: true, fields: ['userId', 'teamId'] }
    ]
  });

  UserTeam.associate = (models) => {
    UserTeam.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    UserTeam.belongsTo(models.Team, { foreignKey: 'teamId', onDelete: 'CASCADE' });
  };

  return UserTeam;
};

