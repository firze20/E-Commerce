import logger from "./utils/logger";
import createServer from "./utils/server";
import { connectDatabase } from "./utils/connect";

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = createServer();

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.ts'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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
