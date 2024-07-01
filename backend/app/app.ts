import logger from "./utils/logger";
import createServer from "./utils/server";
import swaggerDocs from "./utils/swagger";

const port = Number(process.env.PORT)  || 3000;


// Start the server async so it can sync the database 
(async () => {
  try {
    const app = await createServer();

    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
      
      // Passing Swagger docs to app
      swaggerDocs(app, port);
    });
  } catch (error) {
    logger.error('Error starting the server:', error);
    process.exit(1); // Exit the process with an error code
  }
})();
