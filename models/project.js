"use strict";

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('active','archived'), allowNull: false, defaultValue: 'active' },
    teamId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'Projects',
    timestamps: true
  });

  Project.associate = (models) => {
    Project.belongsTo(models.Team, { foreignKey: 'teamId', onDelete: 'CASCADE' });
    Project.hasMany(models.Ticket, { foreignKey: 'projectId' });
  };

  return Project;
};

