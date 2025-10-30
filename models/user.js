"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin','manager','member'), allowNull: false, defaultValue: 'member' },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  }, {
    tableName: 'Users',
    timestamps: true
  });

  User.associate = (models) => {
    User.belongsToMany(models.Team, { through: models.UserTeam, foreignKey: 'userId', otherKey: 'teamId' });
    User.hasMany(models.Ticket, { foreignKey: 'assigneeId', as: 'assignedTickets' });
    User.hasMany(models.TimeEntry, { foreignKey: 'userId' });
  };

  return User;
};

