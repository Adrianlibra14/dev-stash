"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("item_collections", {
      itemId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: { model: "items", key: "id" },
        onDelete: "CASCADE",
      },
      collectionId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: { model: "collections", key: "id" },
        onDelete: "CASCADE",
      },
      addedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Speeds up reverse lookups (items of a collection).
    await queryInterface.addIndex("item_collections", ["collectionId"], {
      name: "item_collections_collection_id_idx",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("item_collections");
  },
};
