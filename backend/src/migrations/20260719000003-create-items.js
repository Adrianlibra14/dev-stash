"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("items", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      contentType: {
        type: Sequelize.ENUM("text", "file"),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      fileUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fileSize: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      url: {
        type: Sequelize.STRING(2048),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      isFavorite: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isPinned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      language: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
      },
      itemTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "item_types", key: "id" },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex("items", ["userId"], {
      name: "items_user_id_idx",
    });
    await queryInterface.addIndex("items", ["itemTypeId"], {
      name: "items_item_type_id_idx",
    });
    await queryInterface.addIndex("items", ["isFavorite"], {
      name: "items_is_favorite_idx",
    });
    await queryInterface.addIndex("items", ["isPinned"], {
      name: "items_is_pinned_idx",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("items");
    // dropTable does not remove the ENUM type Postgres created for contentType.
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_items_contentType";',
    );
  },
};
