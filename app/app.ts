
import logger from "./utils/logger";
import createServer from "./utils/server";
import {connectDatabase} from "./utils/connect";


const app = createServer();

const port = process.env.PORT || 3000;

// Start the server async so it can sync the database 
app.listen(port, async() => {
  logger.info(`Server running on port ${port}`);
  //Connect and sync with models inside models folder, migration to postgres
  await connectDatabase();

  
});

