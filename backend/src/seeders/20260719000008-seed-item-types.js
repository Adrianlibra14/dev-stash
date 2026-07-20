"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("item_types", [
      {
        name: "Snippet",
        slug: "snippet",
        icon: "Code",
        color: "#3b82f6",
        isSystem: true,
        userId: null,
      },
      {
        name: "Prompt",
        slug: "prompt",
        icon: "Sparkles",
        color: "#8b5cf6",
        isSystem: true,
        userId: null,
      },
      {
        name: "Command",
        slug: "command",
        icon: "Terminal",
        color: "#f97316",
        isSystem: true,
        userId: null,
      },
      {
        name: "Note",
        slug: "note",
        icon: "StickyNote",
        color: "#fde047",
        isSystem: true,
        userId: null,
      },
      {
        name: "Link",
        slug: "link",
        icon: "Link",
        color: "#10b981",
        isSystem: true,
        userId: null,
      },
      {
        name: "File",
        slug: "file",
        icon: "File",
        color: "#6b7280",
        isSystem: true,
        userId: null,
      },
      {
        name: "Image",
        slug: "image",
        icon: "Image",
        color: "#ec4899",
        isSystem: true,
        userId: null,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("item_types", { isSystem: true }, {});
  },
};
