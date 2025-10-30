"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      status: { type: Sequelize.ENUM('open','in_progress','done'), allowNull: false, defaultValue: 'open' },
      priority: { type: Sequelize.ENUM('low','medium','high'), allowNull: false, defaultValue: 'medium' },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Projects', key: 'id' },
        onDelete: 'CASCADE'
      },
      assigneeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'SET NULL'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
    await queryInterface.addIndex('Tickets', ['status', 'projectId'], { name: 'tickets_status_project_idx' });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Tickets');
    await queryInterface.sequelize.query("DROP TYPE IF EXISTS \"enum_Tickets_status\";");
    await queryInterface.sequelize.query("DROP TYPE IF EXISTS \"enum_Tickets_priority\";");
  }
};

