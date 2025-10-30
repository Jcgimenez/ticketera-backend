"use strict";

module.exports = (sequelize, DataTypes) => {
  const TimeEntry = sequelize.define('TimeEntry', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hours: { type: DataTypes.DECIMAL(5,2), allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    notes: { type: DataTypes.TEXT },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    ticketId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'TimeEntries',
    timestamps: true,
    indexes: [
      { fields: ['ticketId', 'userId', 'date'] }
    ]
  });

  TimeEntry.associate = (models) => {
    TimeEntry.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    TimeEntry.belongsTo(models.Ticket, { foreignKey: 'ticketId', onDelete: 'CASCADE' });
  };

  return TimeEntry;
};

