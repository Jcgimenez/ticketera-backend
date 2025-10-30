"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TimeEntries', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      hours: { type: Sequelize.DECIMAL(5,2), allowNull: false },
      date: { type: Sequelize.DATEONLY, allowNull: false },
      notes: { type: Sequelize.TEXT },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      },
      ticketId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Tickets', key: 'id' },
        onDelete: 'CASCADE'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
    await queryInterface.addIndex('TimeEntries', ['ticketId', 'userId', 'date'], { name: 'timeentries_ticket_user_date_idx' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('TimeEntries');
  }
};

