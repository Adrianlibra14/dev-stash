import app from "./app";
import { connectDatabase } from "./config/database";
import "./models/associations";

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    app.listen(port, function () {
      console.log(`Dev stash server initiated listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
