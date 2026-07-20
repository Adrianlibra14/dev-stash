"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("item_tags", {
      itemId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: { model: "items", key: "id" },
        onDelete: "CASCADE",
      },
      tagId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: { model: "tags", key: "id" },
        onDelete: "CASCADE",
      },
    });

    // Speeds up reverse lookups (items for a tag).
    await queryInterface.addIndex("item_tags", ["tagId"], {
      name: "item_tags_tag_id_idx",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("item_tags");
  },
};
