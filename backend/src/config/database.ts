import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: { ssl: { require: true } },
  // Schema changes are applied exclusively via sequelize-cli migrations.
  // Never call sequelize.sync().
});

export const connectDatabase = async (): Promise<void> => {
  await sequelize.authenticate();
  console.log("Database connection established successfully");
};
