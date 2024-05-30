import logger from "./utils/logger";
import createServer from "./utils/server";
import { connectDatabase } from "./utils/connect";

const app = createServer();

const port = process.env.PORT || 3000;


// Start the server async so it can sync the database 
app.listen(port, async () => {
  try {
    logger.info(`Server running on port ${port}`);
    // Connect and sync with models inside models folder, migration to postgres
    await connectDatabase();
  } catch (error) {
    logger.error('Error starting the server:', error);
    process.exit(1); // Exit the process with an error code
  }
});
