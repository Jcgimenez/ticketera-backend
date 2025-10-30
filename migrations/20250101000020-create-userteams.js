"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserTeams', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },
      teamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Teams', key: 'id' },
        onDelete: 'CASCADE'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
    await queryInterface.addIndex('UserTeams', ['userId', 'teamId'], { unique: true, name: 'userteams_user_team_unique' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('UserTeams');
  }
};

