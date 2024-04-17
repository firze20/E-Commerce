
import logger from "./utils/logger";
import createServer from "./utils/server";
import connectDatabase from "./utils/connect";

//import dbInit from "./db/db.init";

const app = createServer();

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, async() => {
  logger.info(`Server running on port ${port}`);

  await connectDatabase();
});

