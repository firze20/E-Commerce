import logger from "./utils/logger";
import createServer from "./utils/server";
import { connectDatabase } from "./utils/connect";
import swaggerDocs from "./utils/swagger";

const app = createServer();

const port = Number(process.env.PORT)  || 3000;


// Start the server async so it can sync the database 
app.listen(port, async () => {
  try {
    logger.info(`Server running on port ${port}`);
    // Connect and sync with models inside models folder, migration to postgres
    await connectDatabase();
    // Passing Swagger docs to app
    swaggerDocs(app, port);
  } catch (error) {
    logger.error('Error starting the server:', error);
    process.exit(1); // Exit the process with an error code
  }
});
