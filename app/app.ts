
import createServer from "./utils/server";

//import dbInit from "./db/db.init";

const app = createServer();

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.info(`Server running on port ${port}`);
});
