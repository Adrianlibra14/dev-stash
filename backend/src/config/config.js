// Sequelize CLI configuration (used only by sequelize-cli for migrations/seeders).
// The runtime app uses src/config/database.ts instead.
// NOTE: DATABASE_URL should point to the Neon *direct* (non-pooled) endpoint —
// pooled connections via PgBouncer are prone to errors when running migrations.
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: { ssl: { require: true } },
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: { ssl: { require: true } },
  },
};
