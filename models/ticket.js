"use strict";

module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('open','in_progress','done'), allowNull: false, defaultValue: 'open' },
    priority: { type: DataTypes.ENUM('low','medium','high'), allowNull: false, defaultValue: 'medium' },
    projectId: { type: DataTypes.INTEGER, allowNull: false },
    assigneeId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'Tickets',
    timestamps: true,
    indexes: [
      { fields: ['status', 'projectId'] }
    ]
  });

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.Project, { foreignKey: 'projectId', onDelete: 'CASCADE' });
    Ticket.belongsTo(models.User, { foreignKey: 'assigneeId', as: 'assignee', onDelete: 'SET NULL' });
    Ticket.hasMany(models.TimeEntry, { foreignKey: 'ticketId' });
  };

  return Ticket;
};

